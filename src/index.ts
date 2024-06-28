/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.mjs',
	import.meta.url
).toString();

/**
 * A library to open previews of images and pdf.
 *
 * @packageDocumentation
 */

export { type ImagePreviewProps, ImagePreview } from './preview/ImagePreview.js';
export { type PdfPreviewProps, PdfPreview } from './preview/PdfPreview.js';
export {
	PreviewManager,
	PreviewsManagerContext,
	type PreviewManagerContextType,
	type PreviewItem,
	usePreview
} from './preview/PreviewManager.js';
export { PreviewWrapper, type PreviewWrapperProps } from './preview/PreviewWrapper.js';
