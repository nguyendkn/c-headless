import {
  BatchOutputs,
  BatchVariableSelector,
  createBatchOutputsFormPlugin,
  DisplayOutputs,
  IFlowRefValue,
  provideBatchInputEffect,
} from '@flowgram.ai/form-materials';
import { SubCanvasRender } from '@flowgram.ai/free-container-plugin';
import {
  Field,
  FlowNodeJSON,
  FormMeta,
  FormRenderProps,
} from '@flowgram.ai/free-layout-editor';

import {
  Feedback,
  FormContent,
  FormHeader,
  FormItem,
} from '@/workflow/components/forms';
import { useIsSidebar, useNodeRenderContext } from '../../hooks';
import { defaultFormMeta } from '../default-form-meta';

interface LoopNodeJSON extends FlowNodeJSON {
  data: {
    loopFor: IFlowRefValue;
  };
}

export const LoopFormRender = ({
  form: _form,
}: FormRenderProps<LoopNodeJSON>) => {
  const isSidebar = useIsSidebar();
  const { readonly } = useNodeRenderContext();
  const formHeight = 85;

  const loopFor = (
    <Field<IFlowRefValue> name={`loopFor`}>
      {({ field, fieldState }) => (
        <FormItem name={'loopFor'} type={'array'} required>
          <BatchVariableSelector
            style={{ width: '100%' }}
            value={field.value?.content}
            onChange={val => field.onChange({ type: 'ref', content: val })}
            readonly={readonly}
            hasError={Object.keys(fieldState?.errors || {}).length > 0}
          />
          <Feedback errors={fieldState?.errors} />
        </FormItem>
      )}
    </Field>
  );

  const loopOutputs = (
    <Field<Record<string, IFlowRefValue | undefined> | undefined>
      name={`loopOutputs`}
    >
      {({ field, fieldState }) => (
        <FormItem name='loopOutputs' type='object' vertical>
          <BatchOutputs
            style={{ width: '100%' }}
            value={field.value}
            onChange={val => field.onChange(val)}
            readonly={readonly}
            hasError={Object.keys(fieldState?.errors || {}).length > 0}
          />
          <Feedback errors={fieldState?.errors} />
        </FormItem>
      )}
    </Field>
  );

  if (isSidebar) {
    return (
      <>
        <FormHeader />
        <FormContent>
          {loopFor}
          {loopOutputs}
        </FormContent>
      </>
    );
  }
  return (
    <>
      <FormHeader />
      <FormContent>
        {loopFor}
        <SubCanvasRender offsetY={-formHeight} />
        <DisplayOutputs displayFromScope />
      </FormContent>
    </>
  );
};

export const formMeta: FormMeta = {
  ...defaultFormMeta,
  render: LoopFormRender,
  effect: {
    loopFor: provideBatchInputEffect,
  },
  plugins: [createBatchOutputsFormPlugin({ outputKey: 'loopOutputs' })],
};
