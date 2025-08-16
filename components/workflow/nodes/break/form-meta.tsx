import { FormMeta, FormRenderProps } from '@flowgram.ai/free-layout-editor';

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
        <FormContent />
      </>
    );
  }
  return (
    <>
      <FormHeader />
      <FormContent />
    </>
  );
};

export const formMeta: FormMeta = {
  ...defaultFormMeta,
  render: props => <FormRender {...props} />,
};
