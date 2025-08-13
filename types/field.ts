import { DataType } from './type';

export interface Field extends Document {
  name: string;
  type: DataType;
  description?: string;
  required?: boolean;
}
