import { useMemo } from 'react';

import { createContainerNodePlugin } from '@flowgram.ai/free-container-plugin';
import { createFreeGroupPlugin } from '@flowgram.ai/free-group-plugin';
import {
  FlowNodeBaseType,
  FlowNodeEntity,
  FreeLayoutProps,
  WorkflowNodeLinesData,
} from '@flowgram.ai/free-layout-editor';
import { createFreeLinesPlugin } from '@flowgram.ai/free-lines-plugin';
import { createFreeNodePanelPlugin } from '@flowgram.ai/free-node-panel-plugin';
import { createFreeSnapPlugin } from '@flowgram.ai/free-snap-plugin';
import { createMinimapPlugin } from '@flowgram.ai/minimap-plugin';
import { debounce } from 'lodash';

import { BaseNode } from '../components/base-node';
import { CommentRender } from '../components/comment';
import { GroupNodeRender } from '../components/group';
import { LineAddButton } from '../components/line-add-button';
import { NodePanel } from '../components/node-panel';
import { SelectorBoxPopover } from '../components/selector-box-popover';
import { WorkflowNodeType } from '../nodes';
import { defaultFormMeta } from '../nodes/default-form-meta';
import {
  createContextMenuPlugin,
  createRuntimePlugin,
  createVariablePanelPlugin,
} from '../plugins';
import { WorkflowRuntimeService } from '../plugins/runtime-plugin/runtime-service';
import { CustomService } from '../services';
import { shortcuts } from '../shortcuts';
import { FlowDocumentJSON, FlowNodeRegistry } from '../typings';
import { onDragLineEnd } from '../utils';

export function useEditorProps(
  initialData: FlowDocumentJSON,
  nodeRegistries: FlowNodeRegistry[]
): FreeLayoutProps {
  return useMemo<FreeLayoutProps>(
    () => ({
      /**
       * Whether to enable the background
       */
      background: true,
      /**
       * Canvas-related configurations
       */
      playground: {
        /**
         * Prevent Mac browser gestures from turning pages
         */
        preventGlobalGesture: true,
      },
      /**
       * Whether it is read-only or not, the node cannot be dragged in read-only mode
       */
      readonly: false,
      /**
       * Initial data
       */
      initialData,
      /**
       * Node registries
       */
      nodeRegistries,
      /**
       * Get the default node registry, which will be merged with the 'nodeRegistries'
       */
      getNodeDefaultRegistry(type) {
        return {
          type,
          meta: {
            defaultExpanded: true,
          },
          formMeta: defaultFormMeta,
        };
      },
      /**
       * Node data transformation, called by ctx.document.fromJSON
       * @param node
       * @param json
       */
      fromNodeJSON(_node, json) {
        return json;
      },
      /**
       * Node data transformation, called by ctx.document.toJSON
       * @param node
       * @param json
       */
      toNodeJSON(_node, json) {
        return json;
      },
      lineColor: {
        hidden: 'var(--g-workflow-line-color-hidden,transparent)',
        default: 'var(--g-workflow-line-color-default,#4d53e8)',
        drawing: 'var(--g-workflow-line-color-drawing, #5DD6E3)',
        hovered: 'var(--g-workflow-line-color-hover,#37d0ff)',
        selected: 'var(--g-workflow-line-color-selected,#37d0ff)',
        error: 'var(--g-workflow-line-color-error,red)',
        flowing: 'var(--g-workflow-line-color-flowing,#4d53e8)',
      },
      /*
       * Check whether the line can be added
       */
      canAddLine(_ctx, fromPort, toPort) {
        // Cannot be a self-loop on the same node / 不能是同一节点自循环
        if (fromPort.node === toPort.node) {
          return false;
        }
        // Cannot be in different containers - 不能在不同容器
        if (
          fromPort.node.parent?.id !== toPort.node.parent?.id &&
          ![
            fromPort.node.parent?.flowNodeType,
            toPort.node.parent?.flowNodeType,
          ].includes(FlowNodeBaseType.GROUP)
        ) {
          return false;
        }
        /**
         * Line loop detection, which is not allowed to connect to the node in front of it
         */
        return !fromPort.node
          .getData(WorkflowNodeLinesData)
          .allInputNodes.includes(toPort.node);
      },
      /**
       * Check whether the line can be deleted, this triggers on the default shortcut `Backspace` or `Delete`
       */
      canDeleteLine(_ctx, _line, _newLineInfo, _silent) {
        return true;
      },
      /**
       * Check whether the node can be deleted, this triggers on the default shortcut `Backspace` or `Delete`
       */
      canDeleteNode(_ctx, _node) {
        return true;
      },
      /**
       * 是否允许拖入子画布 (loop or group)
       * Whether to allow dragging into the sub-canvas (loop or group)
       */
      canDropToNode: (_ctx, params) => {
        const { dragNodeType, dropNodeType } = params;
        /**
         * 开始/结束节点无法更改容器
         * The start and end nodes cannot change container
         */
        if (
          [
            WorkflowNodeType.Start,
            WorkflowNodeType.End,
            WorkflowNodeType.BlockStart,
            WorkflowNodeType.BlockEnd,
          ].includes(dragNodeType as WorkflowNodeType)
        ) {
          return false;
        }
        /**
         * 继续循环与终止循环只能在循环节点中
         * Continue loop and break loop can only be in loop nodes
         */
        if (
          [WorkflowNodeType.Continue, WorkflowNodeType.Break].includes(
            dragNodeType as WorkflowNodeType
          ) &&
          dropNodeType !== WorkflowNodeType.Loop
        ) {
          return false;
        }
        /**
         * 循环节点无法嵌套循环节点
         * Loop node cannot nest loop node
         */
        if (
          dragNodeType === WorkflowNodeType.Loop &&
          dropNodeType === WorkflowNodeType.Loop
        ) {
          return false;
        }
        return true;
      },
      /**
       * Drag the end of the line to create an add panel (feature optional)
       * 拖拽线条结束需要创建一个添加面板 （功能可选）
       * 希望提供控制线条粗细的配置项
       */
      onDragLineEnd,
      /**
       * SelectBox config
       */
      selectBox: {
        SelectorBoxPopover,
      },
      scroll: {
        /**
         * Whether to restrict the node from rolling out of the canvas needs to be closed because there is a running results pane
         * 是否限制节点不能滚出画布，由于有运行结果面板，所以需要关闭
         */
        enableScrollLimit: false,
      },
      materials: {
        components: {},
        /**
         * Render Node
         */
        renderDefaultNode: BaseNode,
        renderNodes: {
          [WorkflowNodeType.Comment]: ({ node }: { node: FlowNodeEntity }) => (
            <CommentRender node={node} />
          ),
        },
      },
      /**
       * Node engine enable, you can configure formMeta in the FlowNodeRegistry
       */
      nodeEngine: {
        enable: true,
      },
      /**
       * Variable engine enable
       */
      variableEngine: {
        enable: true,
      },
      /**
       * Redo/Undo enable
       */
      history: {
        enable: true,
        enableChangeNode: true, // Listen Node engine data change
      },
      /**
       * Content change
       */
      onContentChange: debounce((ctx, event) => {
        if (ctx.document.disposed) return;
        console.log('Auto Save: ', event, ctx.document.toJSON());
      }, 1000),
      /**
       * Running line
       */
      isFlowingLine: (ctx, line) =>
        ctx.get(WorkflowRuntimeService).isFlowingLine(line),
      /**
       * Shortcuts
       */
      shortcuts,
      /**
       * Bind custom service
       */
      onBind: ({ bind }) => {
        bind(CustomService).toSelf().inSingletonScope();
      },
      /**
       * Playground init
       */
      onInit(_ctx) {
        console.log('--- Playground init ---');
      },
      /**
       * Playground render
       */
      onAllLayersRendered(ctx) {
        // ctx.tools.autoLayout(); // init auto layout
        ctx.tools.fitView(false);
        console.log('--- Playground rendered ---');
      },
      /**
       * Playground dispose
       */
      onDispose() {
        console.log('---- Playground Dispose ----');
      },
      i18n: {
        locale: navigator.language,
        languages: {
          'zh-CN': {
            'Never Remind': '不再提示',
            'Hold {{key}} to drag node out': '按住 {{key}} 可以将节点拖出',
          },
          'en-US': {},
        },
      },
      plugins: () => [
        /**
         * Line render plugin
         * 连线渲染插件
         */
        createFreeLinesPlugin({
          renderInsideLine: LineAddButton,
        }),
        /**
         * Minimap plugin
         * 缩略图插件
         */
        createMinimapPlugin({
          disableLayer: true,
          canvasStyle: {
            canvasWidth: 182,
            canvasHeight: 102,
            canvasPadding: 50,
            canvasBackground: 'rgba(242, 243, 245, 1)',
            canvasBorderRadius: 10,
            viewportBackground: 'rgba(255, 255, 255, 1)',
            viewportBorderRadius: 4,
            viewportBorderColor: 'rgba(6, 7, 9, 0.10)',
            viewportBorderWidth: 1,
            viewportBorderDashLength: undefined,
            nodeColor: 'rgba(0, 0, 0, 0.10)',
            nodeBorderRadius: 2,
            nodeBorderWidth: 0.145,
            nodeBorderColor: 'rgba(6, 7, 9, 0.10)',
            overlayColor: 'rgba(255, 255, 255, 0.55)',
          },
          inactiveDebounceTime: 1,
        }),

        /**
         * Snap plugin
         * 自动对齐及辅助线插件
         */
        createFreeSnapPlugin({
          edgeColor: '#00B2B2',
          alignColor: '#00B2B2',
          edgeLineWidth: 1,
          alignLineWidth: 1,
          alignCrossWidth: 8,
        }),
        /**
         * NodeAddPanel render plugin
         * 节点添加面板渲染插件
         */
        createFreeNodePanelPlugin({
          renderer: NodePanel,
        }),
        /**
         * This is used for the rendering of the loop node sub-canvas
         * 这个用于 loop 节点子画布的渲染
         */
        createContainerNodePlugin({}),
        /**
         * Group plugin
         */
        createFreeGroupPlugin({
          groupNodeRender: GroupNodeRender,
        }),
        /**
         * ContextMenu plugin
         */
        createContextMenuPlugin({}),
        /**
         * Runtime plugin
         */
        createRuntimePlugin({
          mode: 'browser',
          // mode: 'server',
          // serverConfig: {
          //   domain: 'localhost',
          //   port: 4000,
          //   protocol: 'http',
          // },
        }),

        /**
         * Variable panel plugin
         * 变量面板插件
         */
        createVariablePanelPlugin({}),
      ],
    }),
    []
  );
}
