/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useCombinedRefs } from '@zextras/carbonio-design-system';

import styles from './ImagePreview.module.css';
import { PreviewNavigator, type PreviewNavigatorProps } from './PreviewNavigator.js';

export interface ImagePreviewProps extends Omit<PreviewNavigatorProps, 'onOverlayClick'> {
	/** Preview img source */
	src: string | File | Blob;
	/** Alternative text for the image */
	alt?: string;
}

/** Main component for rendering the preview of an image */
export const ImagePreview = React.forwardRef<HTMLDivElement, ImagePreviewProps>(function PreviewFn(
	{
		src,
		show,
		container,
		disablePortal,
		extension = '',
		filename = '',
		size = '',
		actions = [],
		closeAction,
		onClose,
		alt,
		onNextPreview,
		onPreviousPreview
	},
	ref
) {
	const [computedSrc, setComputedSrc] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (typeof src === 'string') {
			setComputedSrc(src);
		}
		if (src instanceof File || src instanceof Blob) {
			setComputedSrc(URL.createObjectURL(src));
		}
	}, [src, setComputedSrc]);

	const previewRef = useCombinedRefs<HTMLDivElement>(ref);
	const imageRef = useRef<HTMLImageElement>(null);

	const eventListener = useCallback<(e: KeyboardEvent) => void>(
		(event) => {
			if (event.key === 'Escape') {
				onClose(event);
			} else if (event.key === 'ArrowRight' && onNextPreview) {
				onNextPreview(event);
			} else if (event.key === 'ArrowLeft' && onPreviousPreview) {
				onPreviousPreview(event);
			}
		},
		[onClose, onNextPreview, onPreviousPreview]
	);

	useEffect(() => {
		if (show) {
			document.addEventListener('keydown', eventListener);
		}

		return (): void => {
			document.removeEventListener('keydown', eventListener);
		};
	}, [eventListener, show]);

	const onOverlayClick = useCallback<React.ReactEventHandler>(
		(event) => {
			// TODO: stop propagation or not?
			event.stopPropagation();
			previewRef.current &&
				!event.isDefaultPrevented() &&
				(previewRef.current === event.target ||
					!previewRef.current.contains(event.target as Node)) &&
				onClose(event);
		},
		[onClose, previewRef]
	);

	return (
		<PreviewNavigator
			onPreviousPreview={onPreviousPreview}
			onNextPreview={onNextPreview}
			container={container}
			disablePortal={disablePortal}
			extension={extension}
			show={show}
			filename={filename}
			actions={actions}
			size={size}
			onOverlayClick={onOverlayClick}
			closeAction={closeAction}
			onClose={onClose}
		>
			<div ref={previewRef} className={styles.previewContainer}>
				<img
					alt={alt ?? filename}
					src={computedSrc}
					onError={(error): void => console.error('TODO handle error', error)}
					ref={imageRef}
					className={styles.image}
				/>
			</div>
		</PreviewNavigator>
	);
});
