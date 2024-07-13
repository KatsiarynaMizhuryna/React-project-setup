import { useCallback, useState } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Results from './components/Results/Results';
import { Character } from './models';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import Layout from './layout/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<MainPage />}>
        <Route path="character/:id" element={<DetailsPage />} />
      </Route>
      {/* <Route path="*" element={<ErrorP />} /> */}
    </Route>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
