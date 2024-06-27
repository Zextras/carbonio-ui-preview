## API Report File for "@zextras/carbonio-ui-preview"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { ForwardRefExoticComponent } from 'react';
import * as React_2 from 'react';
import { RefAttributes } from 'react';
import { Theme } from '@zextras/carbonio-design-system';
import { TooltipProps } from '@zextras/carbonio-design-system';

// @public (undocumented)
interface HeaderAction {
    disabled?: boolean;
    icon: keyof Theme['icons'];
    id: string;
    onClick: (ev: React_2.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
    tooltipLabel?: string;
    tooltipPlacement?: TooltipProps['placement'];
}

// @public (undocumented)
interface HeaderProps {
    actions: HeaderAction[];
    // Warning: (ae-forgotten-export) The symbol "HeaderAction" needs to be exported by the entry point index.d.ts
    closeAction?: HeaderAction;
    extension: string;
    filename: string;
    size: string;
}

// @public
export const ImagePreview: ForwardRefExoticComponent<ImagePreviewProps & RefAttributes<HTMLDivElement>>;

// Warning: (ae-forgotten-export) The symbol "PreviewNavigatorProps" needs to be exported by the entry point index.d.ts
//
// @public (undocumented)
export interface ImagePreviewProps extends Omit<PreviewNavigatorProps, 'onOverlayClick'> {
    alt?: string;
    src: string | File | Blob;
}

// @public (undocumented)
type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [P in keyof T]?: T[P];
};

// @public
export const PdfPreview: React_2.ForwardRefExoticComponent<PdfPreviewProps & React_2.RefAttributes<HTMLDivElement>>;

// Warning: (ae-forgotten-export) The symbol "PreviewCriteriaAlternativeContentProps" needs to be exported by the entry point index.d.ts
//
// @public (undocumented)
export interface PdfPreviewProps extends Omit<PreviewNavigatorProps, 'onOverlayClick'>, Omit<PreviewCriteriaAlternativeContentProps, 'downloadSrc'> {
    customContent?: React_2.ReactElement;
    errorLabel?: string;
    fitToWidthLabel?: string;
    forceCache?: boolean;
    loadingLabel?: string;
    lowerLimitReachedLabel?: string;
    pageLabel?: string;
    printActionTooltipLabel?: string;
    renderAnnotationLayer?: boolean;
    renderTextLayer?: boolean;
    resetZoomLabel?: string;
    src: string | File | Blob | ArrayBuffer;
    upperLimitReachedLabel?: string;
    useFallback?: boolean;
    zoomInLabel?: string;
    zoomOutLabel?: string;
}

// @public (undocumented)
interface PreviewCriteriaAlternativeContentProps {
    contentLabel?: string;
    downloadLabel?: string;
    downloadSrc?: string;
    filename?: string;
    noteLabel?: string;
    openLabel?: string;
    openSrc?: string;
    titleLabel?: string;
}

// Warning: (ae-forgotten-export) The symbol "MakeOptional" needs to be exported by the entry point index.d.ts
//
// @public
export type PreviewItem = ((MakeOptional<Omit<ImagePreviewProps, 'show'>, 'onClose'> & {
    previewType: 'image';
}) | (MakeOptional<Omit<PdfPreviewProps, 'show'>, 'onClose'> & {
    previewType: 'pdf';
})) & {
    id: string;
};

// @public
export const PreviewManager: React_2.FC;

// @public (undocumented)
export interface PreviewManagerContextType {
    createPreview: (item: MakeOptional<PreviewItem, 'id'>) => void;
    emptyPreview: () => void;
    initPreview: (items: PreviewItem[]) => void;
    openPreview: (id: string) => void;
}

// Warning: (ae-forgotten-export) The symbol "HeaderProps" needs to be exported by the entry point index.d.ts
//
// @public (undocumented)
interface PreviewNavigatorProps extends Partial<Omit<HeaderProps, 'closeAction'>> {
    closeAction?: Omit<HeaderAction, 'onClick'>;
    container?: Element;
    disablePortal?: boolean;
    onClose: (e: React_2.SyntheticEvent | KeyboardEvent) => void;
    onNextPreview?: (e: React_2.SyntheticEvent | KeyboardEvent) => void;
    onOverlayClick?: React_2.JSX.IntrinsicElements['div']['onClick'];
    onPreviousPreview?: (e: React_2.SyntheticEvent | KeyboardEvent) => void;
    show: boolean;
}

// @public
export const PreviewsManagerContext: React_2.Context<PreviewManagerContextType>;

// @public
export const PreviewWrapper: React_2.VFC<PreviewWrapperProps>;

// @public (undocumented)
export type PreviewWrapperProps = (ImagePreviewProps & {
    previewType: 'image';
}) | (PdfPreviewProps & {
    previewType: 'pdf';
});

```