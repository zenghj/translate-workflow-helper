import * as path from 'path'
import * as util from 'util'
import * as fs from 'fs'

export const fsPromises = {
  readdir: util.promisify(fs.readdir),
  readFile: util.promisify(fs.readFile),
  stat: util.promisify(fs.stat),
  writeFile: util.promisify(fs.writeFile),
  copyFile: util.promisify(fs.copyFile)
}



export async function getSubDirNames(dirPath) {
  const files = await fsPromises.readdir(dirPath)
  const result = []

  for(let filename of files) {
    const stats = await fsPromises.stat(path.resolve(dirPath, filename) )
    if (stats.isDirectory()) {
      result.push(filename)
    }
  }
  return result;
}
