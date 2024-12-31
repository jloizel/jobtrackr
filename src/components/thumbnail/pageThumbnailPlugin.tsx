import * as React from 'react';
import type { Plugin, RenderViewer } from '@react-pdf-viewer/core';

export interface PageThumbnailPluginProps {
    PageThumbnail: React.ReactElement;
}

export const pageThumbnailPlugin = (props: PageThumbnailPluginProps): Plugin => {
  const { PageThumbnail } = props;

  return {
    renderViewer: (renderProps: RenderViewer) => {
      let { slot } = renderProps;

      if (slot.subSlot) {
        slot.subSlot.attrs = {};
        slot.subSlot.children = <></>;
      }

      slot.children = PageThumbnail;

      return slot;
    },
  };
};
