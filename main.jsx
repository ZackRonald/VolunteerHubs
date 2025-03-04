import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Login from './Pages/Login.jsx';
import Home from './Pages/Home.jsx';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Admin from './Pages/Admin.jsx';
import AddStaff from './Pages/AddStaff.jsx';
import Volunteer from './Pages/Volunteer.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Admin/>} />
    <Route path='/AddStaff' element={<AddStaff/>} />
    <Route path='/Login' element={<Login/>} />
    <Route path='/Home' element={<Home/>} />
    <Route path='/Volunteer' element={<Volunteer/>} />
    <Route path='/Event-Scheduling' element={<App/>} />

    </Routes>
    </BrowserRouter>
  </StrictMode>
);
