import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import './index.css';
import UncontrolledForm from './components/uncontrolledForm/UncontrolledForm';
import ControlledForm from './components/controlledForm/ControlledForm';
import Home from './pages/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/controlled',
        element: <ControlledForm />,
      },
      {
        path: '/uncontrolled',
        element: <UncontrolledForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
