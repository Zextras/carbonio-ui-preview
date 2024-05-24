/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/**
 * A library to open previews of images and pdf.
 *
 * @packageDocumentation
 */

/** Base components */
export { type ImagePreviewProps, ImagePreview } from './preview/ImagePreview';
export { type PdfPreviewProps, PdfPreview } from './preview/PdfPreview';
/** Utils */
export {
	PreviewManager,
	PreviewsManagerContext,
	type PreviewManagerContextType,
	type PreviewItem
} from './preview/PreviewManager';
export { PreviewWrapper, type PreviewWrapperProps } from './preview/PreviewWrapper';
