import { schema } from './validation';
import * as yup from 'yup';

// interface IFormInput extends yup.InferType<typeof schema> { }
export type IFormInput = yup.InferType<typeof schema>;
