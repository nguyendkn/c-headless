import { useCallback } from 'react';

import {
  delay,
  usePlayground,
  useService,
  WorkflowDocument,
  WorkflowDragService,
  WorkflowLinesManager,
  WorkflowNodeEntity,
  WorkflowNodeJSON,
  WorkflowPortEntity,
} from '@flowgram.ai/free-layout-editor';
import {
  WorkflowNodePanelService,
  WorkflowNodePanelUtils,
} from '@flowgram.ai/free-node-panel-plugin';

/**
 * click port to trigger node select panel
 */
export const usePortClick = () => {
  const playground = usePlayground();
  const nodePanelService = useService(WorkflowNodePanelService);
  const document = useService(WorkflowDocument);
  const dragService = useService(WorkflowDragService);
  const linesManager = useService(WorkflowLinesManager);

  const onPortClick = useCallback(
    async (e: React.MouseEvent, port: WorkflowPortEntity) => {
      const mousePos = playground.config.getPosFromMouseEvent(e);
      const containerNode = port.node.parent;
      // open node selection panel
      const result = await nodePanelService.singleSelectNodePanel({
        position: mousePos,
        containerNode,
        panelProps: {
          enableScrollClose: true,
        },
      });

      // return if no node selected
      if (!result) {
        return;
      }

      // get selected node type and data
      const { nodeType, nodeJSON } = result;

      // calculate position for the new node
      const nodePosition = WorkflowNodePanelUtils.adjustNodePosition({
        nodeType,
        position: {
          x: mousePos.x + 100,
          y: mousePos.y,
        },
        fromPort: port,
        containerNode,
        document,
        dragService,
      });

      // create new workflow node
      const node: WorkflowNodeEntity = document.createWorkflowNodeByType(
        nodeType,
        nodePosition,
        nodeJSON ?? ({} as WorkflowNodeJSON),
        containerNode?.id
      );

      // wait for node render
      await delay(20);

      // build connection line
      WorkflowNodePanelUtils.buildLine({
        fromPort: port,
        node,
        linesManager,
      });
    },
    []
  );

  return onPortClick;
};
