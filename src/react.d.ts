/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars,unused-imports/no-unused-imports
import React from 'react';

declare module 'react' {
	interface CSSProperties {
		'--scrollbar-thumb-color'?: string;
		'--vertical-divider-background-color'?: string;
	}
}
