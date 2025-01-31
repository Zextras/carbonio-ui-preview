/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useCallback, useEffect, useRef } from 'react';
import * as React from 'react';

import styles from './FocusWithin.module.css';

interface FocusContainerProps {
	/** Whether the focus should return on the element that made the component initially mount */
	returnFocus?: boolean;
	children: React.ReactNode;
}

/**
 * Utility component which keeps the focus within its content, allowing the user to use the keyboard to
 * move across interactive elements, without exiting from the content area
 */
const FocusWithin = ({ children, returnFocus = true }: FocusContainerProps): React.JSX.Element => {
	const contentRef = useRef<HTMLDivElement | null>(null);
	const startSentinelRef = useRef<HTMLDivElement | null>(null);
	const endSentinelRef = useRef<HTMLDivElement | null>(null);

	const onStartSentinelFocus = useCallback(() => {
		if (contentRef.current) {
			const nodeListOf = contentRef.current.querySelectorAll<HTMLElement>('[tabindex]');
			const node = nodeListOf[nodeListOf.length - 1];
			node?.focus();
		}
	}, []);

	const onEndSentinelFocus = useCallback(() => {
		if (contentRef.current) {
			const node = contentRef.current.querySelector<HTMLElement>('[tabindex]');
			node?.focus();
		}
	}, []);

	useEffect(() => {
		const documentElement = window.top?.document ?? document;
		const focusedElement = documentElement.activeElement as HTMLElement;

		contentRef.current?.focus();
		startSentinelRef.current?.addEventListener('focus', onStartSentinelFocus);
		endSentinelRef.current?.addEventListener('focus', onEndSentinelFocus);
		const startSentinelRefSave = startSentinelRef.current;
		const endSentinelRefSave = endSentinelRef.current;

		return (): void => {
			startSentinelRefSave?.removeEventListener('focus', onStartSentinelFocus);
			endSentinelRefSave?.removeEventListener('focus', onEndSentinelFocus);
			// return focus to previous initial element
			if (focusedElement && returnFocus) {
				focusedElement.focus();
			}
		};
	}, [onStartSentinelFocus, onEndSentinelFocus, returnFocus]);

	return (
		<span className={styles.focusContainer}>
			<span tabIndex={0} ref={startSentinelRef} />
			<div tabIndex={-1} ref={contentRef}>
				{children}
			</div>
			<span tabIndex={0} ref={endSentinelRef} />
		</span>
	);
};

export default FocusWithin;
