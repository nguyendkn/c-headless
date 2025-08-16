import { useLayoutEffect } from 'react';

import { IconCrossCircleStroked, IconPlus } from '@douyinfe/semi-icons';
import { Button } from '@douyinfe/semi-ui';
import {
  ConditionRow,
  ConditionRowValueType,
} from '@flowgram.ai/form-materials';
import {
  Field,
  FieldArray,
  WorkflowNodePortsData,
} from '@flowgram.ai/free-layout-editor';
import { nanoid } from 'nanoid';

import { Feedback, FormItem } from '@/workflow/components/forms';
import { useNodeRenderContext } from '@/workflow/hooks';
import { ConditionPort } from './styles';
interface ConditionValue {
  key: string;
  value?: ConditionRowValueType;
}

export function ConditionInputs() {
  const { node, readonly } = useNodeRenderContext();

  useLayoutEffect(() => {
    window.requestAnimationFrame(() => {
      node
        .getData<WorkflowNodePortsData>(WorkflowNodePortsData)
        .updateDynamicPorts();
    });
  }, [node]);

  return (
    <FieldArray name='conditions'>
      {({ field }) => (
        <>
          {field.map((child, index) => (
            <Field<ConditionValue> key={child.name} name={child.name}>
              {({ field: childField, fieldState: childState }) => (
                <FormItem
                  name='if'
                  type='boolean'
                  required={true}
                  labelWidth={40}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ConditionRow
                      readonly={readonly}
                      style={{ flexGrow: 1 }}
                      value={childField.value.value}
                      onChange={v =>
                        childField.onChange({
                          value: v,
                          key: childField.value.key,
                        })
                      }
                    />

                    {!readonly && (
                      <Button
                        theme='borderless'
                        disabled={readonly}
                        icon={<IconCrossCircleStroked />}
                        onClick={() => field.delete(index)}
                      />
                    )}
                  </div>

                  <Feedback
                    errors={childState?.errors}
                    invalid={childState?.invalid}
                  />
                  <ConditionPort
                    data-port-id={childField.value.key}
                    data-port-type='output'
                  />
                </FormItem>
              )}
            </Field>
          ))}
          {!readonly && (
            <div>
              <Button
                theme='borderless'
                icon={<IconPlus />}
                onClick={() =>
                  field.append({
                    key: `if_${nanoid(6)}`,
                    value: { type: 'expression', content: '' },
                  })
                }
              >
                Add
              </Button>
            </div>
          )}
        </>
      )}
    </FieldArray>
  );
}
