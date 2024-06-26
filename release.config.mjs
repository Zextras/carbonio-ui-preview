/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
    branches: [
        "release",
        {
            name: 'devel',
            prerelease: true
        },
        {
            name: 'test',
            prerelease: true
        }
    ],
    plugins: [
        [
            "@semantic-release/commit-analyzer",
            {
                preset: "conventionalcommits"
            }
        ],
        [
            "@semantic-release/release-notes-generator",
            {
                preset: "conventionalcommits"
            }
        ],
        '@semantic-release/npm',
        '@semantic-release/github'
    ]
};