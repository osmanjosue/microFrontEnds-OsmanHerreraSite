import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { PrivacyPolicy } from './pages/PrivacyPolicy';

// Configuración del enrutador de datos (Data Router)
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'politicadeprivacidad',
          element: <PrivacyPolicy />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
