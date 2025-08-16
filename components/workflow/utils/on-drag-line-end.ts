import {
  delay,
  FreeLayoutPluginContext,
  onDragLineEndParams,
  WorkflowDragService,
  WorkflowLinesManager,
  WorkflowNodeEntity,
  WorkflowNodeJSON,
} from '@flowgram.ai/free-layout-editor';
import {
  WorkflowNodePanelService,
  WorkflowNodePanelUtils,
} from '@flowgram.ai/free-node-panel-plugin';

/**
 * Drag the end of the line to create an add panel (feature optional)
 */
export const onDragLineEnd = async (
  ctx: FreeLayoutPluginContext,
  params: onDragLineEndParams
) => {
  // get services from context
  const nodePanelService = ctx.get(WorkflowNodePanelService);
  const document = ctx.document;
  const dragService = ctx.get(WorkflowDragService);
  const linesManager = ctx.get(WorkflowLinesManager);

  // get params from drag event
  const { fromPort, toPort, mousePos, line, originLine } = params;

  // return if invalid line state
  if (originLine || !line) {
    return;
  }

  // return if target port exists
  if (toPort) {
    return;
  }

  // get container node for the new node
  const containerNode = fromPort.node.parent;

  // open node selection panel
  const result = await nodePanelService.singleSelectNodePanel({
    position: mousePos,
    containerNode,
    panelProps: {
      enableNodePlaceholder: true,
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
    position: mousePos,
    fromPort,
    toPort,
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
    fromPort,
    node,
    linesManager,
  });
};
