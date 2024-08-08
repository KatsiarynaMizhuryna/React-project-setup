import notFound from '../../assets/not-found.png';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.not_found}>
      <h2>Nothing found... Try it once more!</h2>
      <img className={styles.not_found_image} src={notFound} alt="not-found" />
    </div>
  );
};

export default NotFound;
