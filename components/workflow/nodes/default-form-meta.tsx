import { Divider } from '@douyinfe/semi-ui';
import {
  autoRenameRefEffect,
  DisplayOutputs,
  listenRefSchemaChange,
  provideJsonSchemaOutputs,
  syncVariableTitle,
  validateFlowValue,
  validateWhenVariableSync,
} from '@flowgram.ai/form-materials';
import {
  FormMeta,
  FormRenderProps,
  ValidateTrigger,
} from '@flowgram.ai/free-layout-editor';

import { FormContent, FormHeader, FormInputs } from '../components/forms';
import { FlowNodeJSON } from '../typings';

export const renderForm = ({ form: _form }: FormRenderProps<FlowNodeJSON>) => (
  <>
    <FormHeader />
    <FormContent>
      <FormInputs />
      <Divider />
      <DisplayOutputs displayFromScope />
    </FormContent>
  </>
);

export const defaultFormMeta: FormMeta<FlowNodeJSON> = {
  render: renderForm,
  validateTrigger: ValidateTrigger.onChange,
  /**
   * Supported writing as:
   * 1: validate as options: { title: () => {} , ... }
   * 2: validate as dynamic function: (values,  ctx) => ({ title: () => {}, ... })
   */
  validate: {
    title: ({ value }) => (value ? undefined : 'Title is required'),
    'inputsValues.*': ({ value, context, formValues, name }) => {
      const valuePropertyKey = name.replace(/^inputsValues\./, '');
      const required = formValues.inputs?.required || [];

      return validateFlowValue(value, {
        node: context.node,
        required: required.includes(valuePropertyKey),
        errorMessages: {
          required: `${valuePropertyKey} is required`,
        },
      });
    },
  },
  /**
   * Initialize (fromJSON) data transformation
   * 初始化(fromJSON) 数据转换
   * @param value
   * @param _ctx
   */
  formatOnInit: (value, _ctx) => value,
  /**
   * Save (toJSON) data transformation
   * 保存(toJSON) 数据转换
   * @param value
   * @param _ctx
   */
  formatOnSubmit: (value, _ctx) => value,
  effect: {
    title: syncVariableTitle,
    outputs: provideJsonSchemaOutputs,
    inputsValues: [
      ...autoRenameRefEffect,
      ...validateWhenVariableSync({ scope: 'public' }),
    ],
    'inputsValues.*': listenRefSchemaChange(params => {
      console.log(
        `[${params.context.node.id}][${params.name}] Schema Of Ref Updated`
      );
    }),
  },
};
