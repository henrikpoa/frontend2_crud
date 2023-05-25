import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

//pages

import About from './pages/About/About';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
/* import Register from './pages/Register/Register';
import UpdateUser from './pages/UpdateUser/UpdateUser';
import DeleteUser from './pages/DeleteUser/DeleteUser'; */

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
        <Route path="/" element={<Home />} />
       {/*  <Route path="/register" element={<Register />} />
        <Route path="/updateuser" element={<UpdateUser />} />
        <Route path="/deleteuser" element={<DeleteUser />} /> */}
        <Route path="/about" element={<About />} />        
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
export default App;
