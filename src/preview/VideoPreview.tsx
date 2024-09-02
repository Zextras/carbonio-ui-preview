/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Text, useCombinedRefs } from '@zextras/carbonio-design-system';

import { PreviewNavigator, type PreviewNavigatorProps } from './PreviewNavigator.js';
import styles from './VideoPreview.module.css';

const videoElement = document.createElement('video');

export interface VideoPreviewProps extends Omit<PreviewNavigatorProps, 'onOverlayClick'> {
	/** Preview video source */
	src: string;
	/** File mime type */
	mimeType?: string;
	/** Label shown when the preview cannot be shown */
	errorLabel?: string;
}

/** Main component for rendering the preview of a video */
export const VideoPreview = forwardRef<HTMLDivElement, VideoPreviewProps>(function PreviewFn(
	{
		src,
		mimeType,
		errorLabel = 'This video cannot be played.',
		show,
		container,
		disablePortal,
		extension = '',
		filename = '',
		size = '',
		actions = [],
		closeAction,
		onClose,
		onNextPreview,
		onPreviousPreview
	},
	ref
) {
	const canPlayType = useMemo(() => {
		if (mimeType) {
			return videoElement.canPlayType(mimeType) !== '';
		}
		return true;
	}, [mimeType]);

	const [videoFailed, setVideoFailed] = useState(false);
	const onVideoError = useCallback(() => {
		setVideoFailed(true);
	}, []);

	const previewRef = useCombinedRefs<HTMLDivElement>(ref);

	const onOverlayClick = useCallback<React.ReactEventHandler>(
		(event) => {
			event.stopPropagation();
			previewRef.current &&
				!event.isDefaultPrevented() &&
				(previewRef.current === event.target ||
					!previewRef.current.contains(event.target as Node)) &&
				onClose(event);
		},
		[onClose, previewRef]
	);

	const videoRef = useRef<HTMLVideoElement>(null);

	const eventListener = useCallback<(e: KeyboardEvent) => void>((event) => {
		if (event.code === 'Space' && videoRef.current) {
			if (videoRef.current.paused) {
				videoRef.current.play();
			} else {
				videoRef.current.pause();
			}
		}
	}, []);

	useEffect(() => {
		if (show) {
			document.addEventListener('keydown', eventListener);
		}

		return (): void => {
			document.removeEventListener('keydown', eventListener);
		};
	}, [eventListener, show]);

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
				{!canPlayType || videoFailed ? (
					<Text color={'gray6'}>{errorLabel}</Text>
				) : (
					// eslint-disable-next-line jsx-a11y/media-has-caption
					<video
						data-testid={'video'}
						ref={videoRef}
						src={src}
						onError={onVideoError}
						className={styles.image}
						controls
					/>
				)}
			</div>
		</PreviewNavigator>
	);
});
