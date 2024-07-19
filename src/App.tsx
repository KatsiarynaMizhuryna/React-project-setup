import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<MainPage />}></Route>)
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
