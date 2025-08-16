import { nanoid } from 'nanoid';

import { IconVariable } from '@/components/icons';
import { FlowNodeRegistry } from '../../typings';
import { WorkflowNodeType } from '../constants';
import { formMeta } from './form-meta';

let index = 0;

export const VariableNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Variable,
  info: {
    icon: IconVariable,
    description: 'Variable Assign and Declaration',
  },
  meta: {
    size: {
      width: 360,
      height: 390,
    },
  },
  onAdd() {
    return {
      id: `variable_${nanoid(5)}`,
      type: 'variable',
      data: {
        title: `Variable_${++index}`,
        assign: [
          {
            operator: 'declare',
            left: 'sum',
            right: {
              type: 'constant',
              content: 0,
              schema: { type: 'integer' },
            },
          },
        ],
      },
    };
  },
  formMeta,
};
