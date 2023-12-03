import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { submitControlledForm } from '../../app/rootSlice';
import { convertFileToBase64 } from '../../utils/convertFileToBase64';
import { schema } from '../../utils/validation';
import CountrySelect from '../CountrySelect/CountrySelect';
import styles from './UncontrolledForm.module.scss';
import { useRef, useState } from 'react';
import { ValidationError } from 'yup';

const UncontrolledForm: React.FC = () => {
  const formRef = useRef(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const form = formRef.current;
    if (!form) {
      return;
    }

    const formData = new FormData(form);

    try {
      const data = {
        name: formData.get('name') || '',
        age: Number(formData.get('age')) || 0,
        email: formData.get('email') || '',
        password: formData.get('password') || '',
        checkpassword: formData.get('checkpassword') || '',
        gender: formData.get('gender') || '',
        checkbox: Boolean(formData.get('checkbox')),
        picture: [formData.get('picture')] as File[] | null,
        country: formData.get('country') || '',
      };

      await schema.validate({ ...data }, { abortEarly: false });
      const imagebase64 = await convertFileToBase64(data.picture![0]);
      const result = { ...data, picture: imagebase64 };

      dispatch(submitControlledForm(result));
      navigate('/');
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors: Record<string, string> = {};
        error.inner.forEach((e) => {
          if (e.path) errors[e.path] = e.message;
        });
        setErrors(errors);
      }
    }
  };

  return (
    <div className="wrapper">
      <h2>Uncontrolled Form</h2>
      <form
        className={styles.form_wrapper}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className={styles.input_wrapper}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input className={styles.input} type="text" id="name" name="name" />
          {errors.name && (
            <span className={styles.error_message}>{errors.name}</span>
          )}
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label} htmlFor="age">
            Age
          </label>
          <input
            className={styles.input}
            type="number"
            inputMode="numeric"
            id="age"
            min="13"
            max="120"
            name="age"
          />
          {errors.age && (
            <span className={styles.error_message}>{errors.age}</span>
          )}
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label} htmlFor="email">
            Email address
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
          />
          {errors.email && (
            <span className={styles.error_message}>{errors.email}</span>
          )}
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
          />
          {errors.password && (
            <span className={styles.error_message}>{errors.password}</span>
          )}
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label} htmlFor="confirm-password">
            Confirm password
          </label>
          <input
            className={styles.input}
            type="password"
            id="confirm-password"
            name="checkpassword"
          />
          {errors.checkpassword && (
            <span className={styles.error_message}>{errors.checkpassword}</span>
          )}
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label} htmlFor="gender">
            Gender
          </label>
          <div>
            <input type="radio" id="male" value="male" name="gender" />
            <label htmlFor="male">Male</label>
            <input type="radio" id="female" value="female" name="gender" />
            <label htmlFor="female">Female</label>
            <input type="radio" id="other" value="other" name="gender" />
            <label htmlFor="other">Other</label>
          </div>
          {errors.gender && (
            <span className={styles.error_message}>{errors.gender}</span>
          )}
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label} htmlFor="t&c">
            Accept terms and conditions{' '}
          </label>
          <input type="checkbox" id="t&c" name="checkbox" />
          {errors.checkbox && (
            <span className={styles.error_message}>{errors.checkbox}</span>
          )}
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label} htmlFor="picture">
            Upload picture (allowed .png .jpeg and less 3mb)
          </label>
          <input type="file" id="picture" accept="image/*" name="picture" />
          {errors.picture && (
            <span className={styles.error_message}>{errors.picture}</span>
          )}
        </div>
        <div className={styles.input_wrapper}>
          <CountrySelect name="country" />
          {errors.country && (
            <span className={styles.error_message}>{errors.country}</span>
          )}
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default UncontrolledForm;
