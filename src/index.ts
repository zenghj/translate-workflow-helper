/**
 * 翻译资源目录形如
.
├── values
│   └── zh.json
└── values-zh-rCN
    └── zh.json
 */
import * as path from 'path'
import { getSubDirNames, fsPromises } from './utils'

interface SyncOptions {
  translationsRootPath: string;
  translationFileName: string;
  outputPath: string;
  outputNameMap: Object;
}

class Translation {
  originalDirName: string;
  originalFileName: string;
  rootPath: string;
  outputName: string;
  content: string;

  constructor({ rootPath, originalDirName, originalFileName }: {
    rootPath: string,
    originalDirName: string, 
    originalFileName: string
  }) {
    this.originalDirName = originalDirName;
    this.originalFileName = originalFileName;
    this.rootPath = rootPath;
  }

  async resolve({outputNameResolver}: {outputNameResolver: Function}) {
    this.content = await this.readContent()
    this.outputName = outputNameResolver(this)
  }

  async readContent() {
    return fsPromises.readFile(
      path.join(this.rootPath, this.originalDirName, this.originalFileName),
      {
        encoding: 'utf-8'
      }
    )
  }

}

class SyncTaskRunner {
  options: SyncOptions;
  translations: Translation[];
  result:any;
  errors: Error[];
  constructor(options) {
    this.options = options
    this.errors = []
  }

  async preSync() {
    const translationDirs = await getSubDirNames(this.options.translationsRootPath)
    this.translations = translationDirs.map(dirName => new Translation({
      rootPath: this.options.translationsRootPath,
      originalDirName: dirName,
      originalFileName: this.options.translationFileName
    }))
    for(let i = 0; i < this.translations.length; i++) {
      await this.translations[i].resolve({
        outputNameResolver: this.outputNameResolver.bind(this)
      })
    }

  }

  outputNameResolver(t: Translation):string {
    const outputNameMap = this.options.outputNameMap
    let filename = ''
    let ext = '.json'
    if (outputNameMap[t.originalDirName]) {
      filename = outputNameMap[t.originalDirName]
    } else if (t.originalDirName === 'values') {
      filename = 'en'
    } else {
      filename = t.originalDirName.replace('values-', '')
    }
    return `${filename}${ext}`
  }

  async sync () {
    for(let i = 0; i < this.translations.length; i++) {
      const t = this.translations[i]
      if (t.content == null) {
        this.errors.push(new Error(t.originalDirName + 'translation content is empty!'))
      }
      await fsPromises.writeFile(
        path.resolve(this.options.outputPath, t.outputName),
        t.content
      )
    }
  }

  postSync () {
    if (this.errors.length) {
      this.errors.forEach(e => {
        console.log(e)
      })
    } else {
      console.log('sync translations successfully!')
    }
  }

}

/**
 * 
 * @param options 
 */
export default async function syncTranslations(options: SyncOptions) {
  const taskRunner = new SyncTaskRunner(options)
  await taskRunner.preSync()
  await taskRunner.sync()
  await taskRunner.postSync()
  return true
}
