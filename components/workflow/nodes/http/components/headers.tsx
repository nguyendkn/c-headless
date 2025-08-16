import {
  DisplayInputsValues,
  IFlowValue,
  InputsValues,
} from '@flowgram.ai/form-materials';
import { Field } from '@flowgram.ai/free-layout-editor';

import { FormItem } from '@/workflow/components/forms';
import { useIsSidebar, useNodeRenderContext } from '@/workflow/hooks';

export function Headers() {
  const { readonly } = useNodeRenderContext();
  const isSidebar = useIsSidebar();

  if (!isSidebar) {
    return (
      <FormItem name='headers' type='object' vertical>
        <Field<
          Record<string, IFlowValue | undefined> | undefined
        > name='headersValues'>
          {({ field }) => <DisplayInputsValues value={field.value} />}
        </Field>
      </FormItem>
    );
  }

  return (
    <FormItem name='headers' type='object' vertical>
      <Field<
        Record<string, IFlowValue | undefined> | undefined
      > name='headersValues'>
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
