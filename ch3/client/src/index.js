import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux'
import Store from './store'
import './index.css';
import App from './App';
import Login from './pages/LoginPage';
import Home from './pages/HomePage';
import Game from './pages/GamePage';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Home />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'game',
    element: <Game />
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
