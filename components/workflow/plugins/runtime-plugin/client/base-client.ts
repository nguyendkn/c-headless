import { injectable } from '@flowgram.ai/free-layout-editor';
import {
  FlowGramAPIName,
  IRuntimeClient,
} from '@flowgram.ai/runtime-interface';

@injectable()
export class WorkflowRuntimeClient implements IRuntimeClient {
  constructor() {}

  public [FlowGramAPIName.TaskRun]!: IRuntimeClient[FlowGramAPIName.TaskRun];

  public [FlowGramAPIName.TaskReport]!: IRuntimeClient[FlowGramAPIName.TaskReport];

  public [FlowGramAPIName.TaskResult]!: IRuntimeClient[FlowGramAPIName.TaskResult];

  public [FlowGramAPIName.TaskCancel]!: IRuntimeClient[FlowGramAPIName.TaskCancel];

  public [FlowGramAPIName.TaskValidate]!: IRuntimeClient[FlowGramAPIName.TaskValidate];
}
