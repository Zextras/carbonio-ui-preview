/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import {PreviewManager} from "@zextras/carbonio-ui-preview";
import {ThemeProvider} from "@zextras/carbonio-design-system";

const container = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <PreviewManager>
        <App />
      </PreviewManager>
    </ThemeProvider>
  </React.StrictMode>,
  container
);

