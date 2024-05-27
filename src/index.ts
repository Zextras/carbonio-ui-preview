/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.js',
	import.meta.url
).toString();

/** Base components */
export * from './preview/ImagePreview';
export * from './preview/PdfPreview';
/** Utils */
export * from './preview/PreviewManager';
export * from './preview/PreviewWrapper';
