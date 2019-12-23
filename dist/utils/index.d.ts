/// <reference types="node" />
import * as fs from 'fs';
export declare const fsPromises: {
    readdir: typeof fs.readdir.__promisify__;
    readFile: typeof fs.readFile.__promisify__;
    stat: typeof fs.stat.__promisify__;
    writeFile: typeof fs.writeFile.__promisify__;
    copyFile: typeof fs.copyFile.__promisify__;
};
export declare function getSubDirNames(dirPath: any): Promise<any[]>;
