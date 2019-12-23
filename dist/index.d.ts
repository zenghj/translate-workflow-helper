interface SyncOptions {
    translationsRootPath: string;
    translationFileName: string;
    outputPath: string;
    outputNameMap: Object;
}
/**
 *
 * @param options
 */
export default function syncTranslations(options: SyncOptions): Promise<boolean>;
export {};
