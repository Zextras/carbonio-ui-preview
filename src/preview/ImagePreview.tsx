/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Container, IconButton, Portal, useCombinedRefs } from '@zextras/carbonio-design-system';

import commonStyles from './CommonStyles.module.css';
import FocusWithin from './FocusWithin.js';
import Header, { HeaderAction, HeaderProps } from './Header.js';
import styles from './ImagePreview.module.css';
import { type MakeOptional } from '../types/utils.js';

type ImagePreviewProps = Partial<Omit<HeaderProps, 'closeAction'>> & {
	/** Left Action for the preview */
	closeAction?: MakeOptional<HeaderAction, 'onClick'>;
	/**
	 * HTML node where to insert the Portal's children.
	 * The default value is 'window.top.document'.
	 * */
	container?: Element;
	/** Flag to disable the Portal implementation */
	disablePortal?: boolean;
	/** Flag to show or hide Portal's content */
	show: boolean;
	/** preview img source */
	src: string | File | Blob;
	/** Callback to hide the preview */
	onClose: (e: React.SyntheticEvent | KeyboardEvent) => void;
	/** Alternative text for image */
	alt?: string;
	/** Callback  */
	onNextPreview?: (e: React.SyntheticEvent | KeyboardEvent) => void;
	/** Callback  */
	onPreviousPreview?: (e: React.SyntheticEvent | KeyboardEvent) => void;
};

const ImagePreview = React.forwardRef<HTMLDivElement, ImagePreviewProps>(function PreviewFn(
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

	const $closeAction = useMemo(() => {
		if (closeAction) {
			return {
				onClick: onClose,
				...closeAction
			};
		}
		return closeAction;
	}, [closeAction, onClose]);

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
		<Portal show={show} disablePortal={disablePortal} container={container}>
			<div onClick={onOverlayClick} className={styles.overlay}>
				<FocusWithin>
					<div className={styles.externalContainer}>
						<Header
							actions={actions}
							filename={filename}
							extension={extension}
							size={size}
							closeAction={$closeAction}
						/>
						<Container orientation="horizontal" crossAlignment="unset" minHeight={0} flexGrow={1}>
							{onPreviousPreview ? (
								<IconButton
									className={commonStyles.absoluteLeftIconButton}
									icon="ArrowBackOutline"
									size="medium"
									backgroundColor="gray0"
									iconColor="gray6"
									borderRadius="round"
									onClick={onPreviousPreview}
								/>
							) : null}
							<div ref={previewRef} className={styles.previewContainer}>
								<img
									alt={alt ?? filename}
									src={computedSrc}
									onError={(error): void => console.error('TODO handle error', error)}
									ref={imageRef}
									className={styles.image}
								/>
							</div>
							{onNextPreview ? (
								<IconButton
									className={commonStyles.absoluteRightIconButton}
									icon="ArrowForwardOutline"
									size="medium"
									backgroundColor="gray0"
									iconColor="gray6"
									borderRadius="round"
									onClick={onNextPreview}
								/>
							) : null}
						</Container>
					</div>
				</FocusWithin>
			</div>
		</Portal>
	);
});

export { ImagePreview, type ImagePreviewProps };
