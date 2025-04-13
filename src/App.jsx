import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import ChatWidget from './components/chatWidget'; // New
import WhatsAppButton from './components/whatsAppButton'; // New
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
        <Footer />
        <ChatWidget /> {/* Added for live chat */}
        <WhatsAppButton /> {/* Added for WhatsApp */}
      </div>
    </Router>
  );
}

export default App;