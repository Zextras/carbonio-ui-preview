/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, createContext, useReducer, useState, useMemo } from 'react';

import findIndex from 'lodash/findIndex';

import { ImagePreviewProps } from './ImagePreview';
import { PdfPreviewProps } from './PdfPreview';
import { PreviewWrapper, PreviewWrapperProps } from './PreviewWrapper';
import { type MakeOptional, MakeRequired } from '../types/utils';

type PreviewItem = (
	| (MakeOptional<Omit<ImagePreviewProps, 'show'>, 'onClose'> & { previewType: 'image' })
	| (MakeOptional<Omit<PdfPreviewProps, 'show'>, 'onClose'> & { previewType: 'pdf' })
) & {
	id?: string;
};

export interface PreviewManagerContextType {
	/**
	 * Initialize and open the preview for the given item
	 */
	createPreview: (item: PreviewItem) => void;
	/**
	 * Initialize the preview for the given items. This function does not open the preview.
	 * Use openPreview to open the preview for one of the initialized items.
	 */
	initPreview: (items: MakeRequired<PreviewItem, 'id'>[]) => void;
	/**
	 * Open the preview for the item with the given id. The item must have been initialized
	 * before with the initPreview method.
	 */
	openPreview: (id: string) => void;
	/**
	 * Clear the initialized previews
	 */
	emptyPreview: () => void;
}

/**
 * The context give access to the functions needed to manage multiple previews.
 * It must be used together with the PreviewManager.
 */
export const PreviewsManagerContext = createContext<PreviewManagerContextType>({
	createPreview: () => undefined,
	initPreview: () => undefined,
	openPreview: () => undefined,
	emptyPreview: () => undefined
});

/**
 * The manager for showing multiple previews.
 * From within it, the PreviewsManagerContext give access to the functions to initialize and open
 * the previews of different items.
 */
export const PreviewManager: React.FC = ({ children }) => {
	const [previews, dispatchPreviews] = useReducer(
		(
			state: Array<PreviewItem>,
			action: { type: 'empty' } | { type: 'init'; value: Array<PreviewItem> }
		) => {
			switch (action.type) {
				case 'init': {
					return action.value;
				}
				case 'empty': {
					return [];
				}
				default: {
					return state;
				}
			}
		},
		[]
	);

	const [openArrayIndex, setOpenArrayIndex] = useState(-1);

	const previewElement: React.ReactElement | undefined = useMemo(() => {
		if (openArrayIndex >= 0) {
			const { onClose, ...props } = previews[openArrayIndex];
			const closePreview: PreviewWrapperProps['onClose'] = (ev) => {
				if (onClose) onClose(ev);
				setOpenArrayIndex(-1);
			};
			const onPreviousPreviewCallback: PreviewWrapperProps['onPreviousPreview'] =
				openArrayIndex === 0
					? undefined
					: (e): void => {
							e.stopPropagation();
							setOpenArrayIndex(openArrayIndex - 1);
						};
			const onNextPreviewCallback: PreviewWrapperProps['onNextPreview'] =
				openArrayIndex === previews.length - 1
					? undefined
					: (e): void => {
							e.stopPropagation();
							setOpenArrayIndex(openArrayIndex + 1);
						};
			return (
				<PreviewWrapper
					{...props}
					show
					onClose={closePreview}
					onPreviousPreview={onPreviousPreviewCallback}
					onNextPreview={onNextPreviewCallback}
				/>
			);
		}
		return undefined;
	}, [openArrayIndex, previews]);

	const createPreview = useCallback<(args: PreviewItem) => void>(
		(args) => {
			dispatchPreviews({
				type: 'init',
				value: [args]
			});
			setOpenArrayIndex(0);
		},
		[dispatchPreviews]
	);

	const emptyPreview = useCallback<() => void>(() => {
		dispatchPreviews({
			type: 'empty'
		});
		setOpenArrayIndex(-1);
	}, [dispatchPreviews]);

	const initPreview = useCallback<(args: Array<PreviewItem>) => void>(
		(args) => {
			dispatchPreviews({
				type: 'init',
				value: args
			});
		},
		[dispatchPreviews]
	);

	const openPreview = useCallback<(id: string) => void>(
		(id) => {
			const index = findIndex(previews, (preview: PreviewItem) => preview.id === id);
			if (index >= 0) {
				setOpenArrayIndex(index);
			}
		},
		[previews, setOpenArrayIndex]
	);

	const previewManagerContextValue = useMemo(
		() => ({ createPreview, initPreview, openPreview, emptyPreview }),
		[createPreview, emptyPreview, initPreview, openPreview]
	);

	return (
		<>
			<PreviewsManagerContext.Provider value={previewManagerContextValue}>
				{children}
			</PreviewsManagerContext.Provider>
			{previewElement}
		</>
	);
};
