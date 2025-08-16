import { IconStart } from '@/components/icons';
import { formMeta } from '@/workflow/nodes/block-start/form-meta';
import { WorkflowNodeType } from '@/workflow/nodes/constants';
import { FlowNodeRegistry } from '@/workflow/typings';

export const BlockStartNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.BlockStart,
  meta: {
    isStart: true,
    deleteDisable: true,
    copyDisable: true,
    sidebarDisabled: true,
    nodePanelVisible: false,
    defaultPorts: [{ type: 'output' }],
    size: {
      width: 100,
      height: 100,
    },
    wrapperStyle: {
      minWidth: 'unset',
      width: '100%',
      borderWidth: 2,
      borderRadius: 12,
      cursor: 'move',
    },
  },
  info: {
    icon: IconStart,
    description: 'The starting node of the block.',
  },
  /**
   * Render node via formMeta
   */
  formMeta,
  /**
   * Start Node cannot be added
   */
  canAdd() {
    return false;
  },
};
