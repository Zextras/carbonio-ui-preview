/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [P in keyof T]?: T[P] };

export type MakeRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;
