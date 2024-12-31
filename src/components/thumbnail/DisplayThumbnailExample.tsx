import * as React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';

import '@react-pdf-viewer/core/lib/styles/index.css';

import { pageThumbnailPlugin } from './pageThumbnailPlugin';

interface DisplayThumbnailExampleProps {
  fileUrl: string;
  pageIndex: number;
  width: number
}

const DisplayThumbnailExample: React.FC<DisplayThumbnailExampleProps> = ({ fileUrl, pageIndex, width }) => {
  const thumbnailPluginInstance = thumbnailPlugin();
  const { Cover } = thumbnailPluginInstance;
  const pageThumbnailPluginInstance = pageThumbnailPlugin({
    PageThumbnail: <Cover getPageIndex={() => pageIndex} width={width}/>,
  });

  return <Viewer fileUrl={fileUrl} plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]} />;
};

export default DisplayThumbnailExample;
