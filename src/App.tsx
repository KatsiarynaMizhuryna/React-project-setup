import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import Layout from './layout/Layout';
import DetailsPage from './pages/DetailsPage/DetailsPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<MainPage />}>
        <Route path="character/:id" element={<DetailsPage />} />
      </Route>
    </Route>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
