import { nanoid } from 'nanoid';

import { IconContinue } from '@/components/icons';
import { WorkflowNodeType } from '@/workflow/nodes/constants';
import { formMeta } from '@/workflow/nodes/continue/form-meta';
import { FlowNodeRegistry } from '@/workflow/typings';

let index = 0;
export const ContinueNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Continue,
  meta: {
    defaultPorts: [{ type: 'input' }],
    sidebarDisabled: true,
    size: {
      width: 360,
      height: 54,
    },
    expandable: false,
    onlyInContainer: WorkflowNodeType.Loop,
  },
  info: {
    icon: IconContinue,
    description:
      'The final node of the workflow, used to return the result information after the workflow is run.',
  },
  /**
   * Render node via formMeta
   */
  formMeta,
  onAdd() {
    return {
      id: `continue_${nanoid(5)}`,
      type: 'continue',
      data: {
        title: `Continue_${++index}`,
      },
    };
  },
};
