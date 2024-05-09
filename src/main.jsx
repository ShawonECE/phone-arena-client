import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root.jsx';
import './index.css';
import Phones from './components/Phones';
import Login from './components/Login';
import AuthProvider from './components/AuthProvider.jsx';
import Orders from './components/Orders';
import Private from './components/Private';
import axios from 'axios';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Phones />,
        loader: () => axios.get('https://phone-arena-server.vercel.app/count')
      },
      {
        path: "/orders",
        element: <Private><Orders /></Private>,
      },
      {
        path: "/login",
        element: <Login />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)