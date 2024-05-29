/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
module.exports = {
 	env: { "es6": true },
	root: true,
	extends: ['./node_modules/@zextras/carbonio-ui-configs/rules/eslint.js'],
	plugins: ['notice'],
	rules: {
		'notice/notice': [
			'error',
			{
				templateFile: './notice.template.ts'
			}
		],
		'jsx-a11y/click-events-have-key-events': 'warn',
		'jsx-a11y/no-static-element-interactions': 'warn'
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: [".js", ".ts", ".ts", ".tsx"],
			}
		}
	},
	ignorePatterns: ['notice.template.ts'],
	parserOptions: {
		 sourceType: "module",
	}
};
