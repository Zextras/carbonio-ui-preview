/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
module.exports = {
	extends: ['wojtekmaj/react'],
	plugins: ['notice'],
	overrides: [
		{
			files: ['**/tests/*'],
			extends: ['plugin:jest-dom/recommended', 'plugin:testing-library/react'],
			rules: {
				'import/no-extraneous-dependencies': 'off'
			}
		}
	],
	rules: {
		'notice/notice': [
			'error',
			{
				templateFile: './notice.template.ts'
			}
		],
		'@typescript-eslint/consistent-type-definitions': 'off'
	},
	ignorePatterns: ['notice.template.ts']
};
