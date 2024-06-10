/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { useTheme } from '@zextras/carbonio-design-system';

import styles from './Navigator.module.css';

export interface NavigatorProps {
	children: React.ReactElement | React.ReactElement[];
}

/** Container for the current preview actions (zoom, page) */
export const Navigator = ({ children }: NavigatorProps): React.JSX.Element => {
	const theme = useTheme();

	return (
		<div
			className={styles.styledContainer}
			style={{ backgroundColor: theme.palette.gray0.regular }}
			onClick={(ev): void => ev.stopPropagation()}
		>
			{children}
		</div>
	);
};
