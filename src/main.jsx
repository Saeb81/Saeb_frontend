import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Log/Login/Login.jsx'
import Sign from './Log/Sign/Sign.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Home from './pages/Home.tsx'
import Library from './pages/Library/Library.jsx'
import Games from './pages/Games/Games.jsx'
import Store from './pages/Store/Store.jsx'
import AddGames from './pages/AddGame/AddGAme.jsx'
import Edit from './pages/AddGame/Edit.jsx'
import Add from './pages/AddGame/Add.jsx'
import Buy from './pages/Buy/Buy.jsx'
import './index.css'


const router = createBrowserRouter([
  {

    path: "/",
    element: <Login/>,
  },
  {
    path: "/sign",
    element: <Sign/>,
  }
  ,
  {

    path: "/home",
    element: <Home/>,
  }
  ,
  {

    path: "/profile",
    element: <Profile/>,
  }

  ,
  {
    path: "/library",
    element: <Library/>,
  }
  ,
  {
    path: "/games",
    element: <Games/>,
  }
  ,
  {
    path: "/store",
    element: <Store/>,
  }
  ,
  {
    path: "/addgames",
    element: <AddGames/>,
  },
  {
    path: "/edit",
    element: <Edit/>,
  }
  ,
  {
    path: "/add",
    element: <Add/>,
  }
  ,
  {
    path: "/buy",
    element: <Buy/>,
  }

]);
console.log("batman")

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)