import { Divider } from '@douyinfe/semi-ui';
import {
  DisplayOutputs,
  IJsonSchema,
  JsonSchemaEditor,
} from '@flowgram.ai/form-materials';
import { Field } from '@flowgram.ai/free-layout-editor';

import { FormItem } from '@/workflow/components/forms';
import { useIsSidebar, useNodeRenderContext } from '@/workflow/hooks';

export function Outputs() {
  const { readonly } = useNodeRenderContext();
  const isSidebar = useIsSidebar();

  if (!isSidebar) {
    return (
      <>
        <Divider />
        <Field<IJsonSchema> name='outputs'>
          {({ field }) => <DisplayOutputs value={field.value} />}
        </Field>
      </>
    );
  }

  return (
    <>
      <Divider />
      <FormItem name='outputs' type='object' vertical>
        <Field<IJsonSchema> name='outputs'>
          {({ field }) => (
            <JsonSchemaEditor
              readonly={readonly}
              value={field.value}
              onChange={value => field.onChange(value)}
            />
          )}
        </Field>
      </FormItem>
    </>
  );
}
