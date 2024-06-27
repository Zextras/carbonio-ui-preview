/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useCallback, useRef } from 'react';
import * as React from 'react';

import { Button, Container, Text } from '@zextras/carbonio-design-system';

import styles from './PreviewCriteriaAlternativeContent.module.css';

export interface PreviewCriteriaAlternativeContentProps {
	/** Src to download the file */
	downloadSrc?: string;
	/** Src that allow to open the file in a separate tab */
	openSrc?: string;
	/** Title for the preview fallback component */
	titleLabel?: string;
	/** Content for the preview fallback component */
	contentLabel?: string;
	/** Download action label */
	downloadLabel?: string;
	/** Open action label */
	openLabel?: string;
	/** Note for the preview fallback component */
	noteLabel?: string;
	/** Name of the file */
	filename?: string;
}

/**
 * The default component for the fallback of a pdf preview.
 * It should be used to let the user download or open the item when
 * the preview is not shown because of some external rule.
 */
export const PreviewCriteriaAlternativeContent: React.VFC<
	PreviewCriteriaAlternativeContentProps
> = ({
	downloadSrc,
	openSrc,
	titleLabel = 'This item cannot be displayed',
	contentLabel = 'The file size exceeds the limit allowed and cannot be displayed',
	downloadLabel = 'DOWNLOAD FILE',
	openLabel = 'OPEN IN A SEPARATE TAB',
	noteLabel = 'Please, download it or open it in a separate tab',
	filename = ''
}) => {
	const ancRef = useRef<HTMLAnchorElement>(null);
	const ancRef2 = useRef<HTMLAnchorElement>(null);

	const downloadClick = useCallback(
		(ev: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
			ev.preventDefault();
			if (ancRef.current) {
				ancRef.current.click();
			}
		},
		[ancRef]
	);

	const openClick = useCallback(
		(ev: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
			ev.preventDefault();
			if (ancRef2.current) {
				ancRef2.current.click();
			}
		},
		[ancRef2]
	);

	return (
		<Container
			background="gray0"
			crossAlignment="center"
			height="fit"
			width="fit"
			gap="1rem"
			className={styles.fakeModal}
		>
			<Text size="large" color="gray6">
				{titleLabel}
			</Text>
			<Text size="medium" color="gray6" weight="bold">
				{contentLabel}
			</Text>
			<Container orientation="horizontal" height="fit" gap="0.5rem">
				{downloadSrc ? (
					<Button
						label={downloadLabel}
						icon="DownloadOutline"
						width="fill"
						onClick={downloadClick}
					/>
				) : null}
				{openSrc ? (
					<Button label={openLabel} icon="DiagonalArrowRightUp" width="fill" onClick={openClick} />
				) : null}
			</Container>
			<Text size="small" color="gray6">
				{noteLabel}
			</Text>
			{downloadSrc ? (
				<a
					download={filename}
					rel="noopener"
					ref={ancRef}
					href={downloadSrc}
					className={styles.attachmentLink}
				>
					Download
				</a>
			) : null}
			{openSrc ? (
				<a rel="noopener" ref={ancRef2} href={openSrc} className={styles.attachmentLink}>
					Open
				</a>
			) : null}
		</Container>
	);
};
