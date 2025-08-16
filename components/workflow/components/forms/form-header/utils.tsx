import { type FlowNodeEntity } from '@flowgram.ai/free-layout-editor';

import { FlowNodeRegistry } from '@/workflow/typings';

const iconStyles: React.CSSProperties = {
  width: 24,
  height: 24,
  scale: '0.8',
  borderRadius: 4,
};

export const getIcon = (node: FlowNodeEntity) => {
  const Icon = node.getNodeRegistry<FlowNodeRegistry>().info?.icon;

  if (!Icon) return null;
  return <Icon style={iconStyles} />;
};
