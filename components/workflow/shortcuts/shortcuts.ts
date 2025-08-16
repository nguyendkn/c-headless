import {
  FreeLayoutPluginContext,
  ShortcutsRegistry,
} from '@flowgram.ai/free-layout-editor';

import { CollapseShortcut } from './collapse';
import { CopyShortcut } from './copy';
import { DeleteShortcut } from './delete';
import { ExpandShortcut } from './expand';
import { PasteShortcut } from './paste';
import { SelectAllShortcut } from './select-all';
import { ZoomInShortcut } from './zoom-in';
import { ZoomOutShortcut } from './zoom-out';

export function shortcuts(
  shortcutsRegistry: ShortcutsRegistry,
  ctx: FreeLayoutPluginContext
) {
  shortcutsRegistry.addHandlers(
    new CopyShortcut(ctx),
    new PasteShortcut(ctx),
    new SelectAllShortcut(ctx),
    new CollapseShortcut(ctx),
    new ExpandShortcut(ctx),
    new DeleteShortcut(ctx),
    new ZoomInShortcut(ctx),
    new ZoomOutShortcut(ctx)
  );
}
