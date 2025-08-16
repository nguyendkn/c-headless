import {
  definePluginCreator,
  FreeLayoutPluginContext,
  PluginCreator,
} from '@flowgram.ai/free-layout-editor';

import { ContextMenuLayer } from './context-menu-layer';

export type ContextMenuPluginOptions = Record<string, never>;

/**
 * Creates a plugin of contextmenu
 * @param ctx - The plugin context, containing the document and other relevant information.
 * @param _options - Plugin options, currently unused.
 */
export const createContextMenuPlugin: PluginCreator<ContextMenuPluginOptions> =
  definePluginCreator<ContextMenuPluginOptions, FreeLayoutPluginContext>({
    onInit(ctx, _options) {
      ctx.playground.registerLayer(ContextMenuLayer);
    },
  });
