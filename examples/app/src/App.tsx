/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import {PreviewManagerContextType, usePreview} from "@zextras/carbonio-ui-preview";
import {useEffect} from "react";

type PreviewItem = Parameters<PreviewManagerContextType['initPreview']>[0][number]

const items = [
  {
    previewType: 'image',
    id: 'img-file',
    src: 'https://picsum.photos/id/237/1000/1500',
    filename: 'A sample image',
    extension: 'jpg'
  },
  {
    previewType: 'image',
    id: 'img-file-2',
    src: 'https://picsum.photos/id/118/1500/1000',
    filename: 'Another image',
    extension: 'jpg'
  },
  {
    previewType: 'pdf',
    id: 'pdf-file',
    src: 'https://pdfobject.com/pdf/sample.pdf',
    filename: 'A sample PDF file',
    extension: 'pdf'
  },
  {
    previewType: 'video',
    id: 'video-file',
    src: 'https://github.com/webrtc/samples/raw/gh-pages/src/video/chrome.mp4',
    filename: 'A sample video',
    extension: 'mp4'
  }
] satisfies PreviewItem[];

function Item({ id, filename}: Readonly<{ id: string; filename: string}>) {
  const { openPreview } = usePreview();
  const clickHandler = () => {
    openPreview(id);
  }

  return <div>
    <span>{filename}</span>
    <button type="button" onClick={clickHandler}>
      Open preview
    </button>
  </div>
}

function App() {
  const {initPreview} = usePreview();

  useEffect(() => {
    initPreview(items);
  }, [initPreview]);

  return (
    <>
      <h1>carbonio-ui-preview example</h1>
      <div>
        {items.map((item) => (
          <Item key={item.id} id={item.id} filename={item.filename} />
        ))}
      </div>
    </>
  )
}

export default App;
