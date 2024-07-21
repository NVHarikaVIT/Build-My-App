import './App.css';
import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';
import About from './Components/About';
import Navbar from './Components/Navbar';
import Home from './Homepage/Home';
import Contact from './Components/Contact';
import ViewProfile from './ProfilePage/ViewProfile';
import Login1 from './Authentication/Login1';
import Signup1 from './Authentication/Signup1';


function App() {
  
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path={'/'} element={<Home />}/>
        <Route path={'/Homepage/Home'} element={<Home/>}/>
        <Route path={'/Components/About'} element={<About/>}/>
        <Route path={'/Components/Contact'} element={<Contact/>}/>
        <Route path={'/ProfilePage/ViewProfile/:userID'} element={<ViewProfile/>} />
        <Route path={'/Authentication/Login1'} element={<Login1/>}/>
        <Route path={'/Authentication/Signup1'} element={<Signup1/>}/>
     </Routes>
    </>
  )
}

export default App;
