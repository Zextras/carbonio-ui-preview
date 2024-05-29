/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
module.exports = {
	env: {
		test: {
			plugins: ["@babel/plugin-transform-modules-commonjs"]
		}
	},
	presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
};