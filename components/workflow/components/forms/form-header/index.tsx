import { useContext, useState } from 'react';

import {
  IconClose,
  IconSmallTriangleDown,
  IconSmallTriangleLeft,
} from '@douyinfe/semi-icons';
import { Button } from '@douyinfe/semi-ui';
import {
  CommandService,
  useClientContext,
} from '@flowgram.ai/free-layout-editor';

import { NodeMenu } from '@/workflow/components/node-menu';
import { SidebarContext } from '@/workflow/context';
import { useIsSidebar, useNodeRenderContext } from '@/workflow/hooks';
import { FlowCommandId } from '@/workflow/shortcuts';

import { Header, Operators } from './styles';
import { TitleInput } from './title-input';
import { getIcon } from './utils';

export function FormHeader() {
  const { node, expanded, toggleExpand, readonly } = useNodeRenderContext();
  const [titleEdit, updateTitleEdit] = useState<boolean>(false);
  const ctx = useClientContext();
  const { setNodeId } = useContext(SidebarContext);
  const isSidebar = useIsSidebar();
  const handleExpand = (e: React.MouseEvent) => {
    toggleExpand();
    e.stopPropagation(); // Disable clicking prevents the sidebar from opening
  };
  const handleDelete = () => {
    ctx
      .get<CommandService>(CommandService)
      .executeCommand(FlowCommandId.DELETE, [node]);
  };
  const handleClose = () => {
    setNodeId(undefined);
  };

  return (
    <Header>
      {getIcon(node)}
      <TitleInput
        readonly={readonly}
        updateTitleEdit={updateTitleEdit}
        titleEdit={titleEdit}
      />
      {node.renderData.expandable && !isSidebar && (
        <Button
          type='primary'
          icon={
            expanded ? <IconSmallTriangleDown /> : <IconSmallTriangleLeft />
          }
          size='small'
          theme='borderless'
          onClick={handleExpand}
        />
      )}
      {readonly ? undefined : (
        <Operators>
          <NodeMenu
            node={node}
            deleteNode={handleDelete}
            updateTitleEdit={updateTitleEdit}
          />
        </Operators>
      )}
      {isSidebar && (
        <Button
          type='primary'
          icon={<IconClose />}
          size='small'
          theme='borderless'
          onClick={handleClose}
        />
      )}
    </Header>
  );
}
