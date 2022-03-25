import { isDevMode } from '@angular/core';

export const getURL = () => `http://localhost:${isDevMode() ? 3000 : 80}/file-highlighter`;
