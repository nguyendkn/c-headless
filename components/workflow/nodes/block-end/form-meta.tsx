import { Avatar } from '@douyinfe/semi-ui';
import { FormMeta, FormRenderProps } from '@flowgram.ai/free-layout-editor';

import { IconEnd } from '@/components/icons';
import { FlowNodeJSON } from '@/workflow/typings';

export const renderForm = ({ form: _form }: FormRenderProps<FlowNodeJSON>) => (
  <>
    <div
      style={{
        width: 60,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Avatar
        shape='circle'
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          cursor: 'move',
        }}
        alt='Icon'
      >
        <IconEnd />
      </Avatar>
    </div>
  </>
);

export const formMeta: FormMeta<FlowNodeJSON> = {
  render: renderForm,
};
