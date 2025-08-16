import React, { useState } from 'react';

import { IconChevronDown } from '@douyinfe/semi-icons';

import { useNodeRenderContext } from '@/workflow/hooks';

import { cn } from '@/lib/utils';
import styles from './index.module.less';

interface NodeStatusBarProps {
  header?: React.ReactNode;
  defaultShowDetail?: boolean;
  extraBtns?: React.ReactNode[];
}

export const NodeStatusHeader: React.FC<
  React.PropsWithChildren<NodeStatusBarProps>
> = ({ header, defaultShowDetail, children, extraBtns = [] }) => {
  const [showDetail, setShowDetail] = useState(defaultShowDetail);
  const { selectNode } = useNodeRenderContext();

  const handleToggleShowDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectNode(e);
    setShowDetail(!showDetail);
  };

  return (
    <div
      className={styles['node-status-header']}
      onMouseDown={e => e.stopPropagation()}
    >
      <div
        className={cn(
          styles['node-status-header-content'],
          showDetail && styles['node-status-header-content-opened']
        )}
        onMouseDown={e => e.stopPropagation()}
        onClick={handleToggleShowDetail}
      >
        <div className={styles['status-title']}>
          {header}
          {extraBtns.length > 0 ? extraBtns : null}
        </div>
        <div className={styles['status-btns']}>
          <IconChevronDown
            className={cn({
              [styles['is-show-detail']]: showDetail,
            })}
          />
        </div>
      </div>
      {showDetail ? children : null}
    </div>
  );
};
