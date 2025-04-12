import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/footer'; // Added
import Home from './pages/home';
import Order from './pages/order';
import About from './pages/about';
import Contact from './pages/contact';
import Fabrics from './pages/fabrics';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-off-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/fabrics" element={<Fabrics />} />
          </Routes>
        </main>
        <Footer /> {/* Added */}
      </div>
    </Router>
  );
}

export default App;