import {
  definePluginCreator,
  PluginContext,
} from '@flowgram.ai/free-layout-editor';

import {
  WorkflowRuntimeBrowserClient,
  WorkflowRuntimeClient,
  WorkflowRuntimeServerClient,
} from './client';
import { WorkflowRuntimeService } from './runtime-service';
import { RuntimePluginOptions } from './type';

export const createRuntimePlugin = definePluginCreator<
  RuntimePluginOptions,
  PluginContext
>({
  onBind({ bind, rebind }, options) {
    bind(WorkflowRuntimeClient).toSelf().inSingletonScope();
    bind(WorkflowRuntimeServerClient).toSelf().inSingletonScope();
    if (options.mode === 'server') {
      rebind(WorkflowRuntimeClient).to(WorkflowRuntimeServerClient);
    } else {
      rebind(WorkflowRuntimeClient).to(WorkflowRuntimeBrowserClient);
    }
    bind(WorkflowRuntimeService).toSelf().inSingletonScope();
  },
  onInit(ctx, options) {
    if (options.mode === 'server') {
      const serverClient = ctx.get(WorkflowRuntimeServerClient);
      serverClient.init(options.serverConfig);
    }
  },
});
