interface SyncOptions {
    translationsRootPath: string;
    translationFileName: string;
    outputPath: string;
    /**
     * 输出文件名称映射map
     * {
     * values: 'en',
     * values-zh-rCN: 'cn'
     * }
     */
    outputNameMap: Object;
    excludes?: string[];
    transform?: (content: string, t: Translation) => string;
}
declare class Translation {
    originalDirName: string;
    originalFileName: string;
    rootPath: string;
    outputName: string;
    content: string;
    constructor({ rootPath, originalDirName, originalFileName }: {
        rootPath: string;
        originalDirName: string;
        originalFileName: string;
    });
    resolve({ outputNameResolver }: {
        outputNameResolver: Function;
    }): Promise<void>;
    readContent(): Promise<string>;
}
/**
 *
 * @param options
 */
export default function syncTranslations(options: SyncOptions): Promise<boolean>;
export {};
