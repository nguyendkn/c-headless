import {
  DisplayOutputs,
  JsonSchemaEditor,
  provideJsonSchemaOutputs,
  syncVariableTitle,
} from '@flowgram.ai/form-materials';
import {
  Field,
  FieldRenderProps,
  FormMeta,
  FormRenderProps,
  ValidateTrigger,
} from '@flowgram.ai/free-layout-editor';

import { FormContent, FormHeader } from '@/workflow/components/forms';
import { useIsSidebar } from '../../hooks';
import { FlowNodeJSON, JsonSchema } from '../../typings';

export const FormRender = ({ form: _form }: FormRenderProps<FlowNodeJSON>) => {
  const isSidebar = useIsSidebar();
  if (isSidebar) {
    return (
      <>
        <FormHeader />
        <FormContent>
          <Field
            name='outputs'
            render={({
              field: { value, onChange },
            }: FieldRenderProps<JsonSchema>) => (
              <>
                <JsonSchemaEditor
                  value={value}
                  onChange={value => onChange(value as JsonSchema)}
                />
              </>
            )}
          />
        </FormContent>
      </>
    );
  }
  return (
    <>
      <FormHeader />
      <FormContent>
        <DisplayOutputs displayFromScope />
      </FormContent>
    </>
  );
};

export const formMeta: FormMeta<FlowNodeJSON> = {
  render: props => <FormRender {...props} />,
  validateTrigger: ValidateTrigger.onChange,
  validate: {
    title: ({ value }: { value: string }) =>
      value ? undefined : 'Title is required',
  },
  effect: {
    title: syncVariableTitle,
    outputs: provideJsonSchemaOutputs,
  },
};
