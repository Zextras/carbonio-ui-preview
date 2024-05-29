/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';
import styles from './Navigator.module.css'
import {useTheme} from "@zextras/carbonio-design-system";

export interface NavigatorProps {
	children: React.ReactElement | React.ReactElement[];
}

export const Navigator = ({ children }: NavigatorProps): React.JSX.Element => {
	const theme = useTheme()

	return (
	<div className={styles.styledContainer} style={{backgroundColor: theme.palette.gray0.regular}} onClick={(ev): void => ev.stopPropagation()}>{children}</div>
)}
