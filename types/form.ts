import { Method } from './type';

export interface Form extends Document {
  name: string;
  description?: string;
  method: Method;
}
