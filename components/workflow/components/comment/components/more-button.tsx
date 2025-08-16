import { FC } from 'react';

import { NodeMenu } from '@/workflow/components/node-menu';
import { WorkflowNodeEntity } from '@flowgram.ai/free-layout-editor';

interface IMoreButton {
  node: WorkflowNodeEntity;
  focused: boolean;
  deleteNode: () => void;
}

export const MoreButton: FC<IMoreButton> = ({ node, focused, deleteNode }) => (
  <div
    className={`workflow-comment-more-button ${
      focused ? 'workflow-comment-more-button-focused' : ''
    }`}
  >
    <NodeMenu
      node={node}
      deleteNode={deleteNode}
      updateTitleEdit={() => {}} // Comment nodes don't support title editing
    />
  </div>
);
