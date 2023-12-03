import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z][a-z]*$/, {
      message: 'Name must start with a capital letter',
      excludeEmptyString: true,
    })
    .required('Name is a required field'),
  age: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .positive('Age must be a positive')
    .integer('Age must be an integer')
    .min(13, 'Must be at least 13 years old')
    .max(120, 'Are you really so old?')
    .required('Age is a required field'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is a required field'),
  password: yup
    .string()
    .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/, {
      message:
        'Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character',
      excludeEmptyString: true,
    })
    .required('Password is a required field'),
  checkpassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
  checkbox: yup
    .boolean()
    .oneOf([true], 'You must accept the Terms & Conditions')
    .required(),
  gender: yup.string().oneOf(['male', 'female', 'other']).default(null),
  picture: yup
    .mixed()
    .test({
      name: 'fileSize',
      message: 'File size is too large',
      test: (value) => {
        if (!value || !(value instanceof FileList)) return true;
        const kb = 1024;
        const maxSizeMb = 2 * kb * kb;
        const fileSize = (value as FileList)[0]?.size;
        return fileSize <= maxSizeMb;
      },
    })
    .test({
      name: 'fileType',
      message: 'Invalid file format. Only png and jpeg are allowed',
      test: (value) => {
        if (!value || !(value instanceof FileList)) return true;
        const allowedExtensions = ['image/png', 'image/jpeg'];
        const fileType = (value as FileList)[0]?.type;
        return allowedExtensions.includes(fileType);
      },
    }),
  country: yup.string().required('Country is a required field'),
});
