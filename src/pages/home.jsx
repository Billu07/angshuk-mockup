import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // Added
import logo from '../assets/logo.png';

function Home() {
  return (
    <div className="min-h-screen bg-off-white">
      {/* SEO */}
      <Helmet>
        <title>Angshuk - Custom T-shirts & Jerseys</title>
        <meta
          name="description"
          content="Design custom T-shirts and jerseys with Angshuk. High quality, fast delivery."
        />
        <meta name="keywords" content="custom apparel, t-shirts, jerseys, Angshuk" />
      </Helmet>

      {/* Hero Section */}
<div className="pt-20 pb-16 flex flex-col items-center justify-center bg-gradient-to-b from-light-gray to-off-white">
  <img
    src={logo}
    alt="Angshuk Logo"
    className="h-36 md:h-48 lg:h-56 w-auto object-contain mb-6"
  />
  <h1 className="text-5xl font-bold text-deep-charcoal mb-4 text-center">
    Welcome to Angshuk
  </h1>
  <p className="text-lg text-gray-600 mb-8 max-w-md text-center">
    Design custom T-shirts and Jerseys with ease, crafted for quality and comfort.
  </p>
  <Link
                to="/order"
                className="gradient-button inline-block font-semibold"
              >
                Start Ordering
              </Link>
</div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-deep-charcoal text-center mb-8">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'John D.', quote: 'Amazing quality and fast delivery!' },
            { name: 'Sarah K.', quote: 'The jerseys were a hit with our team.' },
            { name: 'Mike R.', quote: 'Easy ordering and great support.' },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow text-center"
            >
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold text-deep-charcoal">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;