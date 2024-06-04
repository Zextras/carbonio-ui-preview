/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { IconButton, Text, Tooltip } from '@zextras/carbonio-design-system';

import styles from './Header.module.css';

export interface HeaderAction {
	/** id used as key */
	id: string;
	/** Action called on click */
	onClick: (ev: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
	/** Icon from the theme */
	icon: string;
	/** Label to show as tooltip for the action */
	tooltipLabel?: string;
	/** Define the placement of the tooltip for the action */
	tooltipPlacement?: React.ComponentPropsWithRef<typeof Tooltip>['placement'];
	/** Disabled status for the action */
	disabled?: boolean;
}

export interface HeaderProps {
	/** Left Action for the preview */
	closeAction?: HeaderAction;
	/** Actions for the preview */
	actions: HeaderAction[];
	/** Extension of the file, shown as info */
	extension: string;
	/** Name of the file, shown as info */
	filename: string;
	/** Size of the file, shown as info */
	size: string;
}

const Header: React.VFC<HeaderProps> = ({ closeAction, actions, filename, extension, size }) => (
	<div className={styles.headerContainer}>
		<div className={styles.leftContainer}>
			{closeAction ? (
				<Tooltip
					label={closeAction.tooltipLabel}
					disabled={!closeAction.tooltipLabel}
					key={closeAction.id}
					placement={closeAction.tooltipPlacement}
				>
					<IconButton
						onClick={closeAction.onClick}
						icon={closeAction.icon}
						size="medium"
						backgroundColor="transparent"
						iconColor="gray6"
					/>
				</Tooltip>
			) : null}
			<div className={styles.infoContainer}>
				<Text size="small" color="gray6">
					{filename}
				</Text>
				<Text size="small" color="gray6" className={styles.upperCase}>
					{extension}
					{extension && size ? <> &middot; </> : null}
					{size}
				</Text>
			</div>
		</div>
		<div className={styles.rightContainer}>
			{actions.map(({ id, onClick, disabled, icon, tooltipLabel, tooltipPlacement }) => (
				<Tooltip
					label={tooltipLabel}
					disabled={!tooltipLabel}
					key={id}
					placement={tooltipPlacement}
				>
					<IconButton
						onClick={onClick}
						disabled={disabled}
						icon={icon}
						size="medium"
						backgroundColor="transparent"
						iconColor="gray6"
					/>
				</Tooltip>
			))}
		</div>
	</div>
);

export default Header;
