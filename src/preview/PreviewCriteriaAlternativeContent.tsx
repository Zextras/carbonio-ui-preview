/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useRef } from 'react';

import { Button, Container, Text } from '@zextras/carbonio-design-system';
import styles from './PreviewCriteriaAlternativeContent.module.css'

export interface PreviewCriteriaAlternativeContentProps {
	downloadSrc?: string;
	/** Src that allow open in separate tab */
	openSrc?: string;
	titleLabel?: string;
	contentLabel?: string;
	downloadLabel?: string;
	openLabel?: string;
	noteLabel?: string;
	filename?: string;
}

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
				{downloadSrc ? <Button
						label={downloadLabel}
						icon="DownloadOutline"
						width="fill"
						onClick={downloadClick}
					/> : null}
				{openSrc ? <Button label={openLabel} icon="DiagonalArrowRightUp" width="fill" onClick={openClick} /> : null}
			</Container>
			<Text size="small" color="gray6">
				{noteLabel}
			</Text>
			{downloadSrc ? <a download={filename} rel="noopener" ref={ancRef} href={downloadSrc} className={styles.attachmentLink}>Download</a> : null}
			{openSrc ? <a rel="noopener" ref={ancRef2} href={openSrc} className={styles.attachmentLink}>Open</a> : null}
		</Container>
	);
};
