import type {
  CSSProperties,
  FC,
  MouseEvent,
  ReactNode,
  TouchEvent,
} from 'react';

import { useWatch } from '@flowgram.ai/free-layout-editor';

import { defaultColor, groupColors } from '../color';
import { GroupField } from '../constant';

interface GroupHeaderProps {
  onDrag: (e: MouseEvent | TouchEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
  children: ReactNode;
  style?: CSSProperties;
}

export const GroupHeader: FC<GroupHeaderProps> = ({
  onDrag,
  onFocus,
  onBlur,
  children,
  style,
}) => {
  const colorName = useWatch<string>(GroupField.Color) ?? defaultColor;
  const color = groupColors[colorName];
  return (
    <div
      className='workflow-group-header'
      data-flow-editor-selectable='false'
      onMouseDown={onDrag}
      onTouchStart={onDrag}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{
        ...style,
        backgroundColor: color['50'],
        borderColor: color['300'],
      }}
    >
      {children}
    </div>
  );
};
