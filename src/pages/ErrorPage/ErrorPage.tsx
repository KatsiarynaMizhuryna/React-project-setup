import { Link, useRouteError } from 'react-router-dom';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
  const error = useRouteError() as { statusText?: string; message?: string };
  console.error(error);

  return (
    <div className={styles.error_page}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
};

export default ErrorPage;
