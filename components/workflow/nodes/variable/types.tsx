import { AssignValueType, IJsonSchema } from '@flowgram.ai/form-materials';
import { FlowNodeJSON } from '@flowgram.ai/free-layout-editor';

export interface VariableNodeJSON extends FlowNodeJSON {
  data: {
    title: string;
    assign: AssignValueType[];
    outputs: IJsonSchema<'object'>;
  };
}
