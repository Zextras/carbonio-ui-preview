/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { ImagePreview, ImagePreviewProps } from './ImagePreview.js';
import { PdfPreview, PdfPreviewProps } from './PdfPreview.js';

type PreviewsProps = ImagePreviewProps | PdfPreviewProps;

type PreviewWrapperProps = PreviewsProps & {
	previewType: 'pdf' | 'image';
};

const PreviewWrapper: React.VFC<PreviewWrapperProps> = ({ previewType, ...props }) =>
	previewType === 'pdf' ? (
		<PdfPreview {...(props as PdfPreviewProps)} />
	) : (
		<ImagePreview {...(props as ImagePreviewProps)} />
	);

export { PreviewWrapper, type PreviewWrapperProps };
