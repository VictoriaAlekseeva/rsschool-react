import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { submitControlledForm } from '../../app/rootSlice';
import { schema } from '../../utils/validation';
import styles from './controller.module.scss';
import { IFormInput } from '../../utils/types';
import { DevTool } from '@hookform/devtools';

const ControlledForm: React.FC = () => {
  const form = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = form;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    console.log('submitted', data);
    dispatch(submitControlledForm(data));
    reset();
    navigate('/');
  };

  return (
    <div className="wrapper">
      <h2>Controlled Form</h2>
      <form className={styles.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input_wrapper}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            {...register('name')}
          />
          {errors.name && (
            <span className={styles.error_message}>{errors.name.message}</span>
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
            {...register('age', { valueAsNumber: true })}
          />
          {errors.age && (
            <span className={styles.error_message}>{errors.age.message}</span>
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
            {...register('email')}
          />
          {errors.email && (
            <span className={styles.error_message}>{errors.email.message}</span>
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
            {...register('password')}
          />
          {errors.password && (
            <span className={styles.error_message}>
              {errors.password.message}
            </span>
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
            {...register('checkpassword')}
          />
          {errors.checkpassword && (
            <span className={styles.error_message}>
              {errors.checkpassword.message}
            </span>
          )}
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label} htmlFor="gender">
            Gender
          </label>
          <div>
            <input
              type="radio"
              id="male"
              value="male"
              {...register('gender')}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="female"
              value="female"
              {...register('gender')}
            />
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              id="other"
              value="other"
              {...register('gender')}
            />
            <label htmlFor="other">Other</label>
          </div>
          {errors.gender && (
            <span className={styles.error_message}>
              {errors.gender.message}
            </span>
          )}
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label} htmlFor="t&c">
            Accept terms and conditions{' '}
          </label>
          <input type="checkbox" id="t&c" {...register('checkbox')} />
          {errors.checkbox && (
            <span className={styles.error_message}>
              {errors.checkbox.message}
            </span>
          )}
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label} htmlFor="picture">
            Upload picture (allowed .png .jpeg and less 3mb)
          </label>
          <input type="file" id="picture" accept="image/*" {...register('picture')} />
          {errors.picture && (
            <span className={styles.error_message}>
              {errors.picture.message}
            </span>
          )}
        </div>
        <input
          disabled={!isValid}
          className={isValid ? styles.submit_enabled : styles.submit_disabled}
          type="submit"
        />
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default ControlledForm;
