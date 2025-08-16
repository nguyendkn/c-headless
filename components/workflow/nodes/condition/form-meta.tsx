import { autoRenameRefEffect } from '@flowgram.ai/form-materials';
import {
  FormMeta,
  FormRenderProps,
  ValidateTrigger,
} from '@flowgram.ai/free-layout-editor';

import { FormContent, FormHeader } from '@/workflow/components/forms';
import { FlowNodeJSON } from '../../typings';
import { ConditionInputs } from './condition-inputs';

export const renderForm = ({ form: _form }: FormRenderProps<FlowNodeJSON>) => (
  <>
    <FormHeader />
    <FormContent>
      <ConditionInputs />
    </FormContent>
  </>
);

export const formMeta: FormMeta<FlowNodeJSON> = {
  render: renderForm,
  validateTrigger: ValidateTrigger.onChange,
  validate: {
    title: ({ value }: { value: string }) =>
      value ? undefined : 'Title is required',
    'conditions.*': ({ value }) => {
      if (!value?.value) return 'Condition is required';
      return undefined;
    },
  },
  effect: {
    conditions: autoRenameRefEffect,
  },
};
