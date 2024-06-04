/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useMemo } from 'react';

import { IconButton, Portal, Container } from '@zextras/carbonio-design-system';

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
	onClose
}: React.PropsWithChildren<PreviewNavigatorProps>): React.JSX.Element => {
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
								<IconButton
									className={styles.absoluteLeftIconButton}
									icon="ArrowBackOutline"
									size="medium"
									backgroundColor="gray0"
									iconColor="gray6"
									borderRadius="round"
									onClick={onPreviousPreview}
								/>
							) : null}
							{children}
							{onNextPreview ? (
								<IconButton
									className={styles.absoluteRightIconButton}
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
};
