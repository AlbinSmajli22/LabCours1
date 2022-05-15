import logo from './logo.svg';
import { useState, Suspense } from 'react';
import './App.css';
import {Home} from './Home';
import {Employe} from './Employe';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">

    <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
        <ul className='navbar-nav'>
            <li className='nav-item- m-1'>
              <NavLink className="btn btn-light btn-outline-primary" to="/Home">
                Home
              </NavLink>
            </li>
            <li className='nav-item- m-1'>
              <NavLink className="btn btn-light btn-outline-primary" to="/Employe">
                Employes
              </NavLink>
            </li>
           
            
        </ul>
    </nav>

    <Routes>
      <Route path="/Home" element={ <Home />} />
      <Route path='/Employe' element={<Employe/>} />
    </Routes>
    

    </div>
    </Router>
  );
}

export default App;
