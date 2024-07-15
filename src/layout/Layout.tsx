import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

function Layout() {
  return (
    <ErrorBoundary>
      <main>
        <Outlet />
      </main>
    </ErrorBoundary>
  );
}

export default Layout;
