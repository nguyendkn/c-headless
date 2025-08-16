import {
  createInferInputsPlugin,
  DisplayInputsValues,
  IFlowValue,
  InputsValues,
} from '@flowgram.ai/form-materials';
import {
  Field,
  FormMeta,
  FormRenderProps,
} from '@flowgram.ai/free-layout-editor';

import { FormContent, FormHeader } from '@/workflow/components/forms';
import { useIsSidebar } from '../../hooks';
import { FlowNodeJSON } from '../../typings';
import { defaultFormMeta } from '../default-form-meta';

export const FormRender = ({ form: _form }: FormRenderProps<FlowNodeJSON>) => {
  const isSidebar = useIsSidebar();
  if (isSidebar) {
    return (
      <>
        <FormHeader />
        <FormContent>
          <Field<
            Record<string, IFlowValue | undefined> | undefined
          > name='inputsValues'>
            {({ field: { value, onChange } }) => (
              <>
                <InputsValues value={value} onChange={_v => onChange(_v)} />
              </>
            )}
          </Field>
        </FormContent>
      </>
    );
  }
  return (
    <>
      <FormHeader />
      <FormContent>
        <Field<
          Record<string, IFlowValue | undefined> | undefined
        > name='inputsValues'>
          {({ field: { value } }) => (
            <>
              <DisplayInputsValues value={value} />
            </>
          )}
        </Field>
      </FormContent>
    </>
  );
};

export const formMeta: FormMeta = {
  ...defaultFormMeta,
  render: props => <FormRender {...props} />,
  plugins: [
    createInferInputsPlugin({
      sourceKey: 'inputsValues',
      targetKey: 'inputs',
    }),
  ],
};
