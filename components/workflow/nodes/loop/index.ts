import {
  FlowNodeTransformData,
  PositionSchema,
  WorkflowNodeEntity,
} from '@flowgram.ai/free-layout-editor';
import { nanoid } from 'nanoid';

import { IconLoop } from '@/components/icons';
import { WorkflowNodeType } from '@/workflow/nodes/constants';
import { formMeta } from '@/workflow/nodes/loop/form-meta';
import { FlowNodeRegistry } from '@/workflow/typings';

let index = 0;
export const LoopNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Loop,
  info: {
    icon: IconLoop,
    description:
      'Used to repeatedly execute a series of tasks by setting the number of iterations and logic.',
  },
  meta: {
    /**
     * Mark as subcanvas
     */
    isContainer: true,
    /**
     * The subcanvas default size setting
     */
    size: {
      width: 424,
      height: 244,
    },
    /**
     * The subcanvas padding setting
     */
    padding: () => ({
      top: 120,
      bottom: 60,
      left: 60,
      right: 60,
    }),
    /**
     * Controls the node selection status within the subcanvas
     */
    selectable(node: WorkflowNodeEntity, mousePos?: PositionSchema): boolean {
      if (!mousePos) {
        return true;
      }
      const transform = node.getData<FlowNodeTransformData>(
        FlowNodeTransformData
      );
      return !transform.bounds.contains(mousePos.x, mousePos.y);
    },
    expandable: false, // disable expanded
    wrapperStyle: {
      minWidth: 'unset',
      width: '100%',
    },
  },
  onAdd() {
    return {
      id: `loop_${nanoid(5)}`,
      type: WorkflowNodeType.Loop,
      data: {
        title: `Loop_${++index}`,
      },
      blocks: [
        {
          id: `block_start_${nanoid(5)}`,
          type: WorkflowNodeType.BlockStart,
          meta: {
            position: {
              x: -80,
              y: 120,
            },
          },
          data: {},
        },
        {
          id: `block_end_${nanoid(5)}`,
          type: WorkflowNodeType.BlockEnd,
          meta: {
            position: {
              x: 80,
              y: 120,
            },
          },
          data: {},
        },
      ],
    };
  },
  formMeta,
};
