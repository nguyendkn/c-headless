import { IFlowValue } from '@flowgram.ai/form-materials';
import {
  FlowNodeEntity,
  WorkflowNodeJSON as FlowNodeJSONDefault,
  WorkflowNodeRegistry as FlowNodeRegistryDefault,
  FreeLayoutPluginContext,
  type WorkflowEdgeJSON,
  WorkflowNodeMeta,
} from '@flowgram.ai/free-layout-editor';

import { FC } from 'react';
import { IconProps } from '../../icons/icon-types';
import { WorkflowNodeType } from '../nodes';
import { type JsonSchema } from './json-schema';

/**
 * You can customize the data of the node, and here you can use JsonSchema to define the input and output of the node
 */
export interface FlowNodeJSON extends FlowNodeJSONDefault {
  data: {
    /**
     * Node title
     */
    title?: string;
    /**
     * Inputs data values
     */
    inputsValues?: Record<string, IFlowValue>;
    /**
     * Define the inputs data of the node by JsonSchema
     */
    inputs?: JsonSchema;
    /**
     * Define the outputs data of the node by JsonSchema
     */
    outputs?: JsonSchema;
    /**
     * Rest properties
     */
    [key: string]: any;
  };
}

/**
 * You can customize your own node meta
 */
export interface FlowNodeMeta extends WorkflowNodeMeta {
  sidebarDisabled?: boolean;
  nodePanelHidden?: boolean;
  wrapperStyle?: React.CSSProperties;
  onlyInContainer?: WorkflowNodeType;
}

/**
 * You can customize your own node registry
 */
export interface FlowNodeRegistry extends FlowNodeRegistryDefault {
  meta: FlowNodeMeta;
  info?: {
    icon: FC<IconProps>;
    description: string;
  };
  canAdd?: (ctx: FreeLayoutPluginContext) => boolean;
  canDelete?: (ctx: FreeLayoutPluginContext, from: FlowNodeEntity) => boolean;
  onAdd?: (ctx: FreeLayoutPluginContext) => FlowNodeJSON;
}

export interface FlowDocumentJSON {
  nodes: FlowNodeJSON[];
  edges: WorkflowEdgeJSON[];
}
