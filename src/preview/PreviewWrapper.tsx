/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import * as React from 'react';

import { ImagePreview, ImagePreviewProps } from './ImagePreview.js';
import { PdfPreview, PdfPreviewProps } from './PdfPreview.js';
import { VideoPreview, VideoPreviewProps } from './VideoPreview.js';

export type PreviewWrapperProps =
	| (ImagePreviewProps & {
			previewType: 'image';
	  })
	| (PdfPreviewProps & { previewType: 'pdf' })
	| (VideoPreviewProps & { previewType: 'video' });

/**
 * Show the preview for a video, an image or a pdf.
 * This component is just a wrapper on the two specific preview components.
 * @param previewType - The type of the preview
 * @param props - The item to show
 */
export const PreviewWrapper: React.VFC<PreviewWrapperProps> = ({ previewType, ...props }) =>
	(previewType === 'pdf' && <PdfPreview {...(props as PdfPreviewProps)} />) ||
	(previewType === 'image' && <ImagePreview {...(props as ImagePreviewProps)} />) || (
		<VideoPreview {...(props as VideoPreviewProps)} />
	);
