/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {PreviewManager} from "@zextras/carbonio-ui-preview";
import {ThemeProvider} from "@zextras/carbonio-design-system";
import App from './App.tsx'

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <PreviewManager>
        <App />
      </PreviewManager>
    </ThemeProvider>
  </React.StrictMode>
);


