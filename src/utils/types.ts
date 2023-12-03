import { schema } from './validation';
import * as yup from 'yup';

export interface IFormInput extends yup.InferType<typeof schema> { }
// export type IFormInput = yup.InferType<typeof schema>;
