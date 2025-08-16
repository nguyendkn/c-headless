import { Divider } from '@douyinfe/semi-ui';
import { CodeEditor } from '@flowgram.ai/form-materials';
import { Field } from '@flowgram.ai/free-layout-editor';

import { useIsSidebar, useNodeRenderContext } from '@/workflow/hooks';

export function Code() {
  const isSidebar = useIsSidebar();
  const { readonly } = useNodeRenderContext();

  if (!isSidebar) {
    return null;
  }

  return (
    <>
      <Divider />
      <Field<string> name='script.content'>
        {({ field }) => (
          <CodeEditor
            languageId='typescript'
            value={field.value}
            onChange={value => field.onChange(value)}
            readonly={readonly}
          />
        )}
      </Field>
    </>
  );
}
