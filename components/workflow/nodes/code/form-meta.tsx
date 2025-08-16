import { createInferInputsPlugin } from '@flowgram.ai/form-materials';
import { FormMeta, FormRenderProps } from '@flowgram.ai/free-layout-editor';

import { FormContent, FormHeader } from '@/workflow/components/forms';
import { defaultFormMeta } from '../default-form-meta';
import { Code } from './components/code';
import { Inputs } from './components/inputs';
import { Outputs } from './components/outputs';
import { CodeNodeJSON } from './types';

export const FormRender = ({ form: _form }: FormRenderProps<CodeNodeJSON>) => (
  <>
    <FormHeader />
    <FormContent>
      <Inputs />
      <Code />
      <Outputs />
    </FormContent>
  </>
);

export const formMeta: FormMeta = {
  render: props => <FormRender {...props} />,
  effect: defaultFormMeta.effect,
  validate: defaultFormMeta.validate,
  plugins: [
    createInferInputsPlugin({ sourceKey: 'inputsValues', targetKey: 'inputs' }),
  ],
};
