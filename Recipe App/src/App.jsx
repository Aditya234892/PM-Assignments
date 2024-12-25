import './App.css'
import Content from './components/Content';
import FavoriteRecipes from './components/FavoriteRecipe';
import Header from './components/Header';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path: "/",
          element: <Content />
        },
        {
          path: "/fav_recipe",
          element: <FavoriteRecipes/>
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App
