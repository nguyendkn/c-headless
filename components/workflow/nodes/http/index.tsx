import { nanoid } from 'nanoid';

import { IconHttp } from '@/components/icons';
import { WorkflowNodeType } from '@/workflow/nodes/constants';
import { formMeta } from '@/workflow/nodes/http/form-meta';
import { FlowNodeRegistry } from '@/workflow/typings';

let index = 0;

export const HTTPNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.HTTP,
  info: {
    icon: IconHttp,
    description: 'Call the HTTP API',
  },
  meta: {
    size: {
      width: 360,
      height: 390,
    },
  },
  onAdd() {
    return {
      id: `http_${nanoid(5)}`,
      type: 'http',
      data: {
        title: `HTTP_${++index}`,
        api: {
          method: 'GET',
        },
        body: {
          bodyType: 'JSON',
        },
        headers: {},
        params: {},
        outputs: {
          type: 'object',
          properties: {
            body: { type: 'string' },
            headers: { type: 'object' },
            statusCode: { type: 'integer' },
          },
        },
      },
    };
  },
  formMeta,
};
