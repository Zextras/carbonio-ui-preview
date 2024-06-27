/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import * as React from 'react';

import { Container, IconButton, Tooltip } from '@zextras/carbonio-design-system';

import styles from './ZoomController.module.css';

export interface ZoomControllerProps {
	decrementable: boolean;
	zoomOutLabel: string | undefined;
	lowerLimitReachedLabel: string | undefined;
	decreaseByStep: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
	fitToWidthActive: boolean;
	resetZoomLabel: string | undefined;
	fitToWidthLabel: string | undefined;
	resetWidth: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
	fitToWidth: (ev: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
	incrementable: boolean;
	zoomInLabel: string | undefined;
	upperLimitReachedLabel: string | undefined;
	increaseByStep: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
}

/** Render a controller for the zoom */
export const ZoomController = ({
	decrementable,
	fitToWidth,
	fitToWidthActive,
	fitToWidthLabel = 'Fit to width',
	incrementable,
	lowerLimitReachedLabel = 'Minimum zoom level reached',
	decreaseByStep,
	increaseByStep,
	resetWidth,
	resetZoomLabel = 'Reset zoom',
	upperLimitReachedLabel = 'Maximum zoom level reached',
	zoomInLabel = 'Zoom in',
	zoomOutLabel = 'Zoom out'
}: ZoomControllerProps): React.JSX.Element => (
	<Container orientation="horizontal" gap="0.5rem" width="fit">
		<Tooltip label={decrementable ? zoomOutLabel : lowerLimitReachedLabel}>
			<IconButton
				disabled={!decrementable}
				icon="Minus"
				size="small"
				backgroundColor="gray0"
				iconColor="gray6"
				onClick={decreaseByStep}
				className={styles.zoomIconButton}
			/>
		</Tooltip>
		<Tooltip label={fitToWidthActive ? resetZoomLabel : fitToWidthLabel}>
			<IconButton
				icon={fitToWidthActive ? 'MinimizeOutline' : 'MaximizeOutline'}
				size="small"
				backgroundColor="gray0"
				iconColor="gray6"
				onClick={fitToWidthActive ? resetWidth : fitToWidth}
				className={styles.zoomIconButton}
			/>
		</Tooltip>
		<Tooltip label={incrementable ? zoomInLabel : upperLimitReachedLabel}>
			<IconButton
				icon="Plus"
				size="small"
				backgroundColor="gray0"
				iconColor="gray6"
				onClick={increaseByStep}
				disabled={!incrementable}
				className={styles.zoomIconButton}
			/>
		</Tooltip>
	</Container>
);
