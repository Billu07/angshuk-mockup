import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Order from './pages/Order';
import About from './pages/About';
import Contact from './pages/Contact';
import Fabrics from './pages/Fabrics';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-off-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/fabrics" element={<Fabrics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;