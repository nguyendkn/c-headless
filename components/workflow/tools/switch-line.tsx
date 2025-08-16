import { useCallback } from 'react';

import { IconButton, Tooltip } from '@douyinfe/semi-ui';
import {
  useService,
  WorkflowLinesManager,
} from '@flowgram.ai/free-layout-editor';

import { IconSwitchLine } from '@/components/icons';

export const SwitchLine = () => {
  const linesManager = useService(WorkflowLinesManager);
  const switchLine = useCallback(() => {
    linesManager.switchLineType();
  }, [linesManager]);

  return (
    <Tooltip content={'Switch Line'}>
      <IconButton
        type='tertiary'
        theme='borderless'
        onClick={switchLine}
        icon={IconSwitchLine}
      />
    </Tooltip>
  );
};
