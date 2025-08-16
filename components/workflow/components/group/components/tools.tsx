import { FC } from 'react';

import { IconHandle } from '@douyinfe/semi-icons';

import { GroupColor } from './color';
import { GroupTitle } from './title';

export const GroupTools: FC = () => (
  <div className='workflow-group-tools'>
    <IconHandle className='workflow-group-tools-drag' />
    <GroupTitle />
    <GroupColor />
  </div>
);
