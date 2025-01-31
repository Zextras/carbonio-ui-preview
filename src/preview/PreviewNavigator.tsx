/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useCallback, useEffect, useMemo } from 'react';
import * as React from 'react';

import { IconButton, Portal, Container, Tooltip } from '@zextras/carbonio-design-system';

import FocusWithin from './FocusWithin.js';
import Header, { HeaderAction, HeaderProps } from './Header.js';
import styles from './PreviewNavigator.module.css';

export interface PreviewNavigatorProps extends Partial<Omit<HeaderProps, 'closeAction'>> {
	/**
	 * Close action for the preview.
	 * The close action does not accept the onClick field, because its click callback
	 * is always set to be the onClose function.
	 */
	closeAction?: Omit<HeaderAction, 'onClick'>;
	/**
	 * Callback to hide the preview. This function is invoked by all events that must close the preview
	 * (closeAction, overlay click, keyboard shortcuts).
	 * In order to invoke the onClose only once when clicking on the closeAction, the event of the onClose
	 * should call preventDefault.
	 *
	 * @example
	 * ```ts
	 * const onClose = (e: React.SyntheticEvent | KeyboardEvent): void => {
	 *  // prevent the default to invoke the onClose callback only once
	 * 	e.preventDefault();
	 * }
	 * ```
	 */
	onClose: (e: React.SyntheticEvent | KeyboardEvent) => void;
	/**
	 * HTML node where to insert the Portal's children.
	 * The default value is 'window.top.document'.
	 */
	container?: Element;
	/** Flag to disable the Portal implementation */
	disablePortal?: boolean;
	/** Flag to show or hide Portal's content */
	show: boolean;
	/** Callback invoked when the next preview is requested */
	onNextPreview?: (e: React.SyntheticEvent | KeyboardEvent) => void;
	/** Callback invoked when the previous preview is requested */
	onPreviousPreview?: (e: React.SyntheticEvent | KeyboardEvent) => void;
	/** Callback invoked when the preview overlay is clicked */
	onOverlayClick?: React.JSX.IntrinsicElements['div']['onClick'];
	/** Tooltip for the previous icon button */
	previousTooltip?: string;
	/** Tooltip for the next icon button */
	nextTooltip?: string;
}

/** Define the preview main layout, allowing the navigation between multiple previews. */
export const PreviewNavigator = ({
	children,
	onPreviousPreview,
	onNextPreview,
	container,
	disablePortal,
	extension = '',
	show,
	filename = '',
	actions = [],
	size = '',
	onOverlayClick,
	closeAction,
	onClose,
	previousTooltip = 'Previous',
	nextTooltip = 'Next'
}: React.PropsWithChildren<PreviewNavigatorProps>): React.JSX.Element => {
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

	const $closeAction = useMemo<HeaderAction | undefined>(() => {
		if (closeAction) {
			return {
				...closeAction,
				onClick: onClose
			};
		}
		return undefined;
	}, [closeAction, onClose]);

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
								<div className={styles.absoluteLeftIconButton}>
									<Tooltip label={previousTooltip}>
										<IconButton
											icon="ArrowBackOutline"
											size="medium"
											backgroundColor="gray0"
											iconColor="gray6"
											borderRadius="round"
											onClick={onPreviousPreview}
										/>
									</Tooltip>
								</div>
							) : null}
							{children}
							{onNextPreview ? (
								<div className={styles.absoluteRightIconButton}>
									<Tooltip label={nextTooltip}>
										<IconButton
											icon="ArrowForwardOutline"
											size="medium"
											backgroundColor="gray0"
											iconColor="gray6"
											borderRadius="round"
											onClick={onNextPreview}
										/>
									</Tooltip>
								</div>
							) : null}
						</Container>
					</div>
				</FocusWithin>
			</div>
		</Portal>
	);
};
