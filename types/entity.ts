import { DataType } from './type';

export interface Entity extends Document {
  name: string;
  description?: string;
}

export interface Attribute {
  id: string;
  name: string;
  type: DataType;
  required: boolean;
}

export interface Value {
  id: string;
  entityId: string;
  attributeId: string;
  value: string | number | boolean | Date | object | [];
}
