import {
  DisplayInputsValues,
  IFlowValue,
  InputsValues,
} from '@flowgram.ai/form-materials';
import { Field } from '@flowgram.ai/free-layout-editor';

import { FormItem } from '@/workflow/components/forms';
import { useIsSidebar, useNodeRenderContext } from '@/workflow/hooks';

export function Inputs() {
  const isSidebar = useIsSidebar();

  const { readonly } = useNodeRenderContext();

  if (!isSidebar) {
    return (
      <Field<
        Record<string, IFlowValue | undefined> | undefined
      > name='inputsValues'>
        {({ field }) => <DisplayInputsValues value={field.value} />}
      </Field>
    );
  }

  return (
    <FormItem name='inputs' type='object' vertical>
      <Field<
        Record<string, IFlowValue | undefined> | undefined
      > name='inputsValues'>
        {({ field }) => (
          <InputsValues
            value={field.value}
            onChange={value => field.onChange(value)}
            readonly={readonly}
          />
        )}
      </Field>
    </FormItem>
  );
}
