import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import ContactUs from './components/Contact/ContactUs.jsx'
import User from './components/User/User.jsx'
import Github from './components/Github/github.jsx'

const router = createBrowserRouter([
  // Add your routes here
 {
   path:"/",
   element:<Layout/>,
   children:[
    {
      path:'',
    element: <Home />
    },
    {
      path:'About',
    element: <About/>
    },
    {
      path:'ContactUs',
    element: <ContactUs/>
    },
    {
      path:'User/:userid',
    element: <User/>
    },
    {
      path:'github',
    element: <Github/>
    },

   ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider  router={router}/>
  </React.StrictMode>,
)
