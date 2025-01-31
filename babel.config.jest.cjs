/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
module.exports = {
    presets: [
		[
			'@babel/preset-env',
			{
				modules: 'commonjs'
			}
		],
		[
			'@babel/preset-react',
			{
				runtime: 'automatic'
			}
		],
		'@babel/preset-typescript'
	]
};
