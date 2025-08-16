import { Divider } from '@douyinfe/semi-ui';
import {
  createInferInputsPlugin,
  DisplayOutputs,
} from '@flowgram.ai/form-materials';
import { FormMeta, FormRenderProps } from '@flowgram.ai/free-layout-editor';

import { FormContent, FormHeader } from '@/workflow/components/forms';
import { defaultFormMeta } from '@/workflow/nodes/default-form-meta';
import { Api } from '@/workflow/nodes/http/components/api';
import { Body } from '@/workflow/nodes/http/components/body';
import { Headers } from '@/workflow/nodes/http/components/headers';
import { Params } from '@/workflow/nodes/http/components/params';
import { Timeout } from '@/workflow/nodes/http/components/timeout';
import { HTTPNodeJSON } from '@/workflow/nodes/http/types';

export const FormRender = ({ form: _form }: FormRenderProps<HTTPNodeJSON>) => (
  <>
    <FormHeader />
    <FormContent>
      <Api />
      <Divider />
      <Headers />
      <Divider />
      <Params />
      <Divider />
      <Body />
      <Divider />
      <Timeout />
      <Divider />
      <DisplayOutputs displayFromScope />
    </FormContent>
  </>
);

export const formMeta: FormMeta = {
  render: props => <FormRender {...props} />,
  effect: defaultFormMeta.effect,
  plugins: [
    createInferInputsPlugin({
      sourceKey: 'headersValues',
      targetKey: 'headers',
    }),
    createInferInputsPlugin({ sourceKey: 'paramsValues', targetKey: 'params' }),
  ],
};
