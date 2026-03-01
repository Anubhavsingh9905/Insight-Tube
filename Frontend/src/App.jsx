import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import FolderView from './pages/FolderView';
import VideoPlayer from './pages/VideoPlayer';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedDashboard from './pages/ProtectedDashboard';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/dashboard",
      element: <ProtectedDashboard/>
    },
    {
      path:"/folder/:name/:id",
      element:<FolderView/>
    },
    {
      path:"/videoPlayer/:fid/:id",
      element:<VideoPlayer/>
    },
    {
      path:"/register",
      element:<Register/>
    },
    {
      path:"/login",
      element:<Login/>
    }
  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
