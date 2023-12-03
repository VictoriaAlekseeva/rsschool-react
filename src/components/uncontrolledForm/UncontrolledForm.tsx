import styles from './uncontrolled.module.scss';
import { useRef } from 'react';

const UncontrolledForm: React.FC = () => {
  const formRef = useRef(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const form = formRef.current;

    if (!form) {
      return;
    }

    const formData = new FormData(form);

    const imageFile = formData.get('picture') as File | null;

    console.log(imageFile);

    const data = {
      name: formData.get('name') || '',
      country: formData.get('country') || '',
      age: Number(formData.get('age')) || 0,
      email: formData.get('email') || '',
      password: formData.get('password') || '',
      confirmPassword: formData.get('confirmPassword') || '',
      gender: formData.get('gender') || '',
      acceptTerms: Boolean(formData.get('acceptTerms')),
    };

    console.log('submitted', data);
  };

  return (
    <div className="wrapper">
      <h2>Controlled Form</h2>
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
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label} htmlFor="t&c">
            Accept terms and conditions{' '}
          </label>
          <input type="checkbox" id="t&c" name="checkbox" />
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label} htmlFor="picture">
            Upload picture (allowed .png .jpeg and less 3mb)
          </label>
          <input type="file" id="picture" accept="image/*" name="picture" />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default UncontrolledForm;
