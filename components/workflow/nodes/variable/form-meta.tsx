import {
  AssignRows,
  createInferAssignPlugin,
  DisplayOutputs,
} from '@flowgram.ai/form-materials';
import { FormMeta, FormRenderProps } from '@flowgram.ai/free-layout-editor';

import { FormContent, FormHeader } from '@/workflow/components/forms';
import { useIsSidebar } from '../../hooks';
import { defaultFormMeta } from '../default-form-meta';
import { VariableNodeJSON } from './types';

export const FormRender = ({
  form: _form,
}: FormRenderProps<VariableNodeJSON>) => {
  const isSidebar = useIsSidebar();

  return (
    <>
      <FormHeader />
      <FormContent>
        {isSidebar ? (
          <AssignRows name='assign' />
        ) : (
          <DisplayOutputs displayFromScope />
        )}
      </FormContent>
    </>
  );
};

export const formMeta: FormMeta = {
  render: props => <FormRender {...props} />,
  effect: defaultFormMeta.effect,
  plugins: [
    createInferAssignPlugin({
      assignKey: 'assign',
      outputKey: 'outputs',
    }),
  ],
};
