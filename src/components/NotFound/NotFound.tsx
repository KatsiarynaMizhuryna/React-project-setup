import Image from 'next/image';
import notFound from '../../../public/not-found.png';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.not_found}>
      <h2>Nothing found... Try it once more!</h2>
      <Image
        className={styles.not_found_image}
        src={notFound}
        alt="not-found"
      />
    </div>
  );
};

export default NotFound;
