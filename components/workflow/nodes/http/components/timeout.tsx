import { InputNumber } from '@douyinfe/semi-ui';
import { Field } from '@flowgram.ai/free-layout-editor';

import { FormItem } from '@/workflow/components/forms';
import { useNodeRenderContext } from '@/workflow/hooks';

export function Timeout() {
  const { readonly } = useNodeRenderContext();

  return (
    <div>
      <FormItem name='Timeout(ms)' required style={{ flex: 1 }} type='number'>
        <Field<number> name='timeout.timeout' defaultValue={10000}>
          {({ field }) => (
            <InputNumber
              size='small'
              value={field.value}
              onChange={value => {
                field.onChange(value as number);
              }}
              disabled={readonly}
              style={{ width: '100%' }}
              min={0}
            />
          )}
        </Field>
      </FormItem>
      <FormItem name='Retry Times' required type='number'>
        <Field<number> name='timeout.retryTimes' defaultValue={1}>
          {({ field }) => (
            <InputNumber
              size='small'
              value={field.value}
              onChange={value => {
                field.onChange(value as number);
              }}
              disabled={readonly}
              style={{ width: '100%' }}
              min={0}
            />
          )}
        </Field>
      </FormItem>
    </div>
  );
}
