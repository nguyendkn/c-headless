import { useCallback } from 'react';

import { IconButton, Tooltip } from '@douyinfe/semi-ui';
import {
  usePlayground,
  usePlaygroundTools,
} from '@flowgram.ai/free-layout-editor';

import { IconAutoLayout } from '@/components/icons';

export const AutoLayout = () => {
  const tools = usePlaygroundTools();
  const playground = usePlayground();
  const autoLayout = useCallback(async () => {
    await tools.autoLayout();
  }, [tools]);

  return (
    <Tooltip content={'Auto Layout'}>
      <IconButton
        disabled={playground.config.readonly}
        type='tertiary'
        theme='borderless'
        onClick={autoLayout}
        icon={IconAutoLayout}
      />
    </Tooltip>
  );
};
