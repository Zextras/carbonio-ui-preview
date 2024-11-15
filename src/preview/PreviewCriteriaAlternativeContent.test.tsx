/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { PreviewCriteriaAlternativeContent } from './PreviewCriteriaAlternativeContent.js';
import { screen, setup } from '../tests/utils.js';

describe('PreviewCriteriaAlternativeContent', () => {
	it('should render the default content', () => {
		setup(<PreviewCriteriaAlternativeContent />);
		expect(screen.getByText('This item cannot be displayed')).toBeVisible();
		expect(
			screen.getByText('The file size exceeds the limit allowed and cannot be displayed')
		).toBeVisible();
		expect(screen.getByText('Please, download it or open it in a separate tab')).toBeVisible();
	});

	it('should render the download button if downloadSrc is set', () => {
		setup(<PreviewCriteriaAlternativeContent downloadSrc={'test'} />);
		expect(screen.getByRole('button', { name: /download file/i })).toBeVisible();
	});

	it('should not render the download button if downloadSrc is not set', () => {
		setup(<PreviewCriteriaAlternativeContent />);
		expect(screen.queryByRole('button', { name: /download file/i })).not.toBeInTheDocument();
	});

	it('should not render the download link', () => {
		setup(<PreviewCriteriaAlternativeContent downloadSrc={'test'} />);
		expect(screen.queryByRole('link', { name: /download/i })).not.toBeInTheDocument();
	});

	it('should render the open button if openSrc is set', () => {
		setup(<PreviewCriteriaAlternativeContent openSrc={'test'} />);
		expect(screen.getByRole('button', { name: /open in a separate tab/i })).toBeVisible();
	});

	it('should not render the open button if openSrc is not set', () => {
		setup(<PreviewCriteriaAlternativeContent />);
		expect(
			screen.queryByRole('button', { name: /open in a separate tab/i })
		).not.toBeInTheDocument();
	});

	it('should not render the open link', () => {
		setup(<PreviewCriteriaAlternativeContent openSrc={'test'} />);
		expect(screen.queryByRole('link', { name: /open/i })).not.toBeInTheDocument();
	});

	it('should render the default content with the given labels', () => {
		setup(
			<PreviewCriteriaAlternativeContent
				openLabel={'open label'}
				contentLabel={'content label'}
				titleLabel={'title label'}
				noteLabel={'note label'}
				downloadLabel={'download label'}
				openSrc={'test'}
				downloadSrc={'test'}
			/>
		);
		expect(screen.getByText('title label')).toBeVisible();
		expect(screen.getByText('content label')).toBeVisible();
		expect(screen.getByText('note label')).toBeVisible();
		expect(screen.getByRole('button', { name: /open label/i })).toBeVisible();
		expect(screen.getByRole('button', { name: /download label/i })).toBeVisible();
	});
});
