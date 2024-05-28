/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {Container, Portal, useCombinedRefs, getColor, useTheme, IconButton} from '@zextras/carbonio-design-system';
import { size as lodashSize, map, noop } from 'lodash';
import type { DocumentProps, PageProps } from 'react-pdf';
import { Document, Page } from 'react-pdf';
// TODO: check how to remove /esm and use only dist import
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import styles from './PdfPreview.css'
import commonStyles from './CommonStyles.css'

import FocusWithin from './FocusWithin.js';
import Header, { HeaderAction, HeaderProps } from './Header.js';
import { Navigator } from './Navigator.js';
import { PageController } from './PageController.js';
import {
	PreviewCriteriaAlternativeContent,
	PreviewCriteriaAlternativeContentProps
} from './PreviewCriteriaAlternativeContent.js';
import { usePageScrollController } from './usePageScrollController.js';
import { useZoom } from './useZoom.js';
import { ZoomController } from './ZoomController.js';
import { SCROLL_STEP } from '../constants/index.js';
import { type MakeOptional } from '../types/utils.js';
import { print } from '../utils/utils.js';

type Page = Parameters<NonNullable<PageProps['onLoadSuccess']>>[0];

type PdfPreviewProps = Partial<Omit<HeaderProps, 'closeAction'>> & {
	/** Left Action for the preview */
	closeAction?: MakeOptional<HeaderAction, 'onClick'>;
	/**
	 * HTML node where to insert the Portal's children.
	 * The default value is 'window.top.document'.
	 * */
	container?: Element;
	/** Flag to disable the Portal implementation */
	disablePortal?: boolean;
	/** Flag to show or hide Portal's content */
	show: boolean;
	/** preview source */
	src: string | File | Blob | ArrayBuffer;
	/** Whether force cache */
	forceCache?: boolean;
	/** Callback to hide the preview */
	onClose: (e: React.SyntheticEvent | KeyboardEvent) => void;
	/** use fallback content if you don't want to view the pdf for some reason; content can be customizable with customContent */
	useFallback?: boolean;
	/** CustomContent */
	customContent?: React.ReactElement;
	/** Whether a text layer should be rendered */
	renderTextLayer?: boolean;
	/** Whether the annotation layer should be rendered */
	renderAnnotationLayer?: boolean;
	zoomOutLabel?: string;
	lowerLimitReachedLabel?: string;
	resetZoomLabel?: string;
	fitToWidthLabel?: string;
	zoomInLabel?: string;
	upperLimitReachedLabel?: string;
	/** Callback  */
	onNextPreview?: (e: React.SyntheticEvent | KeyboardEvent) => void;
	/** Callback  */
	onPreviousPreview?: (e: React.SyntheticEvent | KeyboardEvent) => void;
	pageLabel?: string;
	errorLabel?: string;
	loadingLabel?: string;
	printActionTooltipLabel?: string;
} & Omit<PreviewCriteriaAlternativeContentProps, 'downloadSrc'>;

const PdfPreview = React.forwardRef<HTMLDivElement, PdfPreviewProps>(function PreviewFn(
	{
		src,
		forceCache = true,
		show,
		container,
		disablePortal,
		extension = '',
		filename = '',
		size = '',
		actions: actionsProp = [],
		closeAction,
		onClose,
		useFallback = false,
		customContent,
		renderTextLayer = false,
		renderAnnotationLayer = false,
		openSrc,
		titleLabel,
		contentLabel,
		downloadLabel,
		openLabel,
		noteLabel,
		zoomOutLabel,
		fitToWidthLabel,
		lowerLimitReachedLabel,
		resetZoomLabel,
		upperLimitReachedLabel,
		zoomInLabel,
		onNextPreview,
		onPreviousPreview,
		pageLabel,
		errorLabel = 'Failed to load document preview.',
		loadingLabel = 'Loading document preview…',
		printActionTooltipLabel = 'Print'
	},
	ref
) {
	const [documentFile, setDocumentFile] = useState<ArrayBuffer | Blob | string | null>(null);
	const [fetchFailed, setFetchFailed] = useState(false);

	useEffect(() => {
		// Check whether is a string but not a data URI.
		if (typeof src === 'string' && !src.startsWith('data:') && src.trim().length > 0) {
			const controller = new AbortController();
			fetch(src, { signal: controller.signal, cache: forceCache ? 'force-cache' : undefined })
				.then((res) => res.blob())
				.then((file) => setDocumentFile(file))
				.catch(() => {
					setFetchFailed(true);
				});

			return (): void => controller.abort();
		}
		// ArrayBuffer - File - Blob - data URI string
		setDocumentFile(src);
		return noop;
	}, [src, setDocumentFile, forceCache]);

	const previewRef: React.MutableRefObject<HTMLDivElement | null> = useCombinedRefs(ref);
	const documentLoaded = useRef(useFallback);
	const pageRefs = useRef<React.RefObject<HTMLElement>[]>([]);
	const pdfPageProxyListRef = useRef<Record<number, Page>>({});

	const [numPages, setNumPages] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const {
		currentZoom,
		incrementable,
		decrementable,
		increaseOfOneStep,
		decreaseOfOneStep,
		fitToWidth,
		fitToWidthActive,
		reset
	} = useZoom(previewRef);

	const updatePageOnScroll = useCallback((pageElement: Element | undefined) => {
		if (pageElement) {
			const currentPageIndex = pageRefs.current?.findIndex(
				(pageRef) => pageRef.current === pageElement
			);
			if (currentPageIndex > -1) {
				setCurrentPage(currentPageIndex + 1);
			}
		}
	}, []);

	const { observePage } = usePageScrollController(previewRef, updatePageOnScroll);

	const $closeAction = useMemo(() => {
		if (closeAction) {
			return {
				...closeAction,
				onClick: onClose
			};
		}
		return closeAction;
	}, [closeAction, onClose]);

	const onOverlayClick = useCallback<React.ReactEventHandler>(
		(event) => {
			event.stopPropagation();
			// close preview on click on overlay only if document is loaded (both success or error)
			documentLoaded.current &&
				previewRef.current &&
				!event.isDefaultPrevented() &&
				(previewRef.current === event.target ||
					!previewRef.current.contains(event.target as Node)) &&
				onClose(event);
		},
		[onClose, previewRef]
	);

	useEffect(() => {
		if (!show) {
			reset();
		}
	}, [reset, show]);

	const resetWidth = useCallback(
		(ev: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
			ev.stopPropagation();
			reset();
		},
		[reset]
	);

	const registerPageObserver = useCallback<NonNullable<PageProps['onRenderSuccess']>>(
		({ pageNumber }): void => {
			const pageRef = pageRefs.current[pageNumber - 1];
			if (pageRef.current) {
				observePage(pageRef.current);
			}
		},
		[observePage]
	);

	const [printReady, setPrintReady] = useState(false);

	const pageOnRenderSuccess = useCallback<NonNullable<PageProps['onRenderSuccess']>>(
		(page): void => {
			registerPageObserver(page);
			setPrintReady(lodashSize(pdfPageProxyListRef.current) === numPages);
		},
		[numPages, registerPageObserver]
	);

	const pageOnLoadSuccess = useCallback<NonNullable<PageProps['onLoadSuccess']>>((page) => {
		pdfPageProxyListRef.current[page._pageIndex] = page;
	}, []);

	const pageElements = useMemo(() => {
		if (numPages) {
			pageRefs.current = [];
			return map(new Array(numPages), (el, index) => {
				const pageRef = React.createRef<HTMLDivElement>();
				pageRefs.current.push(pageRef);
				return (
					<Page
						key={`page_${index + 1}`}
						pageNumber={index + 1}
						onRenderSuccess={pageOnRenderSuccess}
						onLoadSuccess={pageOnLoadSuccess}
						width={currentZoom}
						renderTextLayer={renderTextLayer}
						renderAnnotationLayer={renderAnnotationLayer}
						inputRef={pageRef}
					/>
				);
			});
		}
		return [];
	}, [
		currentZoom,
		numPages,
		pageOnLoadSuccess,
		pageOnRenderSuccess,
		renderAnnotationLayer,
		renderTextLayer
	]);

	const onDocumentLoadSuccess = useCallback<NonNullable<DocumentProps['onLoadSuccess']>>(
		(document) => {
			setNumPages(document.numPages);
			setCurrentPage(1);
			documentLoaded.current = true;
		},
		[]
	);

	const onDocumentLoadError = useCallback<NonNullable<DocumentProps['onLoadError']>>((error) => {
		console.error(error);
		documentLoaded.current = true;
	}, []);

	const onDocumentLoadProgress = useCallback<NonNullable<DocumentProps['onLoadProgress']>>(() => {
		documentLoaded.current = false;
	}, []);

	const $customContent = useMemo(() => {
		if (useFallback) {
			return (
				customContent ?? (
					<PreviewCriteriaAlternativeContent
						downloadSrc={
							(typeof src === 'string' && src) ||
							((src instanceof File || src instanceof Blob) && URL.createObjectURL(src)) ||
							URL.createObjectURL(new Blob([src], { type: 'application/pdf' }))
						}
						openSrc={openSrc}
						contentLabel={contentLabel}
						downloadLabel={downloadLabel}
						noteLabel={noteLabel}
						openLabel={openLabel}
						titleLabel={titleLabel}
						filename={filename}
					/>
				)
			);
		}
		return undefined;
	}, [
		useFallback,
		customContent,
		src,
		openSrc,
		contentLabel,
		downloadLabel,
		noteLabel,
		openLabel,
		titleLabel,
		filename
	]);

	const onPageChange = useCallback((newPage: number) => {
		setCurrentPage(newPage);
		pageRefs.current[newPage - 1].current?.scrollIntoView();
	}, []);

	const eventListener = useCallback<(e: KeyboardEvent) => void>(
		(event) => {
			switch (event.key) {
				case 'Escape':
					onClose(event);
					break;
				case 'ArrowRight':
					onNextPreview?.(event);
					break;
				case 'ArrowLeft':
					onPreviousPreview?.(event);
					break;
				case 'Home':
					if (currentPage > 1) {
						onPageChange(1);
					}
					break;
				case 'End':
					if (numPages && currentPage < numPages) {
						onPageChange(numPages);
					}
					break;
				case 'PageUp':
					if (currentPage > 1) {
						onPageChange(currentPage - 1);
					}
					break;
				case 'PageDown':
					if (numPages && currentPage < numPages) {
						onPageChange(currentPage + 1);
					}
					break;
				case 'ArrowUp':
					previewRef.current?.scrollBy(0, -SCROLL_STEP);
					break;
				case 'ArrowDown':
					previewRef.current?.scrollBy(0, SCROLL_STEP);
					break;
				default:
					break;
			}
		},
		[currentPage, numPages, onClose, onNextPreview, onPageChange, onPreviousPreview, previewRef]
	);

	useEffect(() => {
		if (show) {
			document.addEventListener('keydown', eventListener);
		}

		return (): void => {
			document.removeEventListener('keydown', eventListener);
		};
	}, [eventListener, show]);

	const printWithOpen = useCallback<HeaderAction['onClick']>(
		(e) => {
			e.stopPropagation();
			if (documentFile) {
				if (typeof documentFile === 'string') {
					fetch(documentFile)
						.then((res) => res.blob())
						.then((file) => print(file));
				} else {
					print(documentFile);
				}
			}
		},
		[documentFile]
	);

	const printAction = useMemo<HeaderAction>(
		() => ({
			tooltipLabel: printActionTooltipLabel,
			icon: 'PrinterOutline',
			onClick: printWithOpen,
			id: 'print-open',
			disabled: !printReady
		}),
		[printActionTooltipLabel, printReady, printWithOpen]
	);
	const actions = useMemo(() => [printAction, ...actionsProp], [actionsProp, printAction]);

	const theme = useTheme();

	return (
		<Portal show={show} disablePortal={disablePortal} container={container}>
			<div onClick={onOverlayClick} className={styles.overlay}>
				<FocusWithin>
					<div className={styles.externalContainer}>
						{!$customContent && (
							<Navigator>
								<PageController
									pageLabel={pageLabel}
									pagesNumber={numPages ?? 0}
									currentPage={currentPage}
									onPageChange={onPageChange}
								/>
								<div style={{ '--vertical-divider-background-color': getColor("gray6", theme) }} className={styles.verticalDivider} />
								<ZoomController
									decrementable={decrementable}
									zoomOutLabel={zoomOutLabel}
									lowerLimitReachedLabel={lowerLimitReachedLabel}
									decreaseByStep={decreaseOfOneStep}
									fitToWidthActive={fitToWidthActive}
									resetZoomLabel={resetZoomLabel}
									fitToWidthLabel={fitToWidthLabel}
									resetWidth={resetWidth}
									fitToWidth={fitToWidth}
									incrementable={incrementable}
									zoomInLabel={zoomInLabel}
									upperLimitReachedLabel={upperLimitReachedLabel}
									increaseByStep={increaseOfOneStep}
								/>
							</Navigator>
						)}
						<Header
							actions={actions}
							filename={filename}
							extension={extension}
							size={size}
							closeAction={$closeAction}
						/>
						<Container flexGrow={1} orientation="horizontal" crossAlignment="unset" minHeight={0}>
							{onPreviousPreview ? <IconButton
									className={commonStyles.absoluteLeftIconButton}
									icon="ArrowBackOutline"
									size="medium"
									backgroundColor="gray0"
									iconColor="gray6"
									borderRadius="round"
									onClick={onPreviousPreview}
								/> : null}
							<div ref={previewRef} data-testid="pdf-preview-container" className={styles.previewContainer} style={{ "--scrollbar-thumb-color": theme.palette.gray3.regular }}>
								{$customContent ||
									(src && (
										<Document
											file={documentFile}
											onLoadSuccess={onDocumentLoadSuccess}
											onLoadError={onDocumentLoadError}
											onLoadProgress={onDocumentLoadProgress}
											error={errorLabel}
											loading={loadingLabel}
											noData={(fetchFailed && errorLabel) || loadingLabel}
										>
											{pageElements}
										</Document>
									))}
							</div>
							{onNextPreview ? <IconButton
								className={commonStyles.absoluteRightIconButton}
									icon="ArrowForwardOutline"
									size="medium"
									backgroundColor="gray0"
									iconColor="gray6"
									borderRadius="round"
									onClick={onNextPreview}
								/> : null}
						</Container>
					</div>
				</FocusWithin>
			</div>
		</Portal>
	);
});

export { PdfPreview, type PdfPreviewProps };
