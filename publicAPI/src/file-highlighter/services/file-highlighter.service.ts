import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import { SupportedLanguages } from '../../models/language.type';

@Injectable()
export class FileHighlighterService {
    getLanguage(filename: string): SupportedLanguages | undefined {
        const extension = filename.split('.')[1];
        return [
            { extension: ['java'], language: 'java' as SupportedLanguages },
            { extension: ['py'], language: 'python' as SupportedLanguages },
            { extension: ['kt', 'kts', 'ktm'], language: 'kotlin' as SupportedLanguages },
        ].find(obj => obj.extension.includes(extension))?.language
    }

    getFileContent(filePath: string): string {
        return fs.readFileSync(filePath, 'utf-8');
    }

    deleteFile(filePath: string): void {
        fs.unlinkSync(filePath);
    }

}
