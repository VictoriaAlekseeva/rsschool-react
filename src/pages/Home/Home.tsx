import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const Home: React.FC = () => {
  const state = useSelector((store: RootState) => store);
  return (
    <>
    <div className={styles.wrapper}>
      <Link to={'/controlled'}>controlled</Link>
      <Link to={'/uncontrolled'}>uncontrolled</Link>
      </div>
      <div className={styles.form_info__wrapper}>
        {state.length > 0 &&
          state.map((item, index) => (
            <ul key={index} className={styles.form_info}>
              {Object.keys(item).map((key) => (
                <li key={key}>
                  <span>{key}:</span>
                  {`${item[key as keyof typeof item]}`}
                </li>
              ))}
            </ul>
          ))}
      </div>
      </>
  );
};

export default Home;
