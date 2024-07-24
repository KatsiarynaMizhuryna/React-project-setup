import { useState } from 'react';
import styles from './ErrorButton.module.css';

const ErrorButton: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  const handleClick = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Error...');
  }

  return (
    <button className={styles.error_button} onClick={handleClick}>
      Trigger Error
    </button>
  );
};

export default ErrorButton;
