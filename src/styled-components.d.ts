/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Theme as DSTheme } from '@zextras/carbonio-design-system';

declare module 'styled-components' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface DefaultTheme extends DSTheme {}
}
