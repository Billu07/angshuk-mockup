import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-off-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-deep-charcoal text-center mb-8">
          About Angshuk
        </h1>
        <div className="bg-white p-8 rounded-lg shadow max-w-3xl mx-auto">
          <p className="text-gray-600 mb-4">
            At Angshuk, we’re passionate about bringing your apparel ideas to life. Founded
            with a vision to deliver high-quality, custom T-shirts and jerseys, we combine
            craftsmanship with creativity to meet your bulk order needs.
          </p>
          <p className="text-gray-600 mb-4">
            Our team is dedicated to ensuring every order reflects your unique style,
            whether it’s for a sports team, corporate event, or community gathering.
          </p>
          <p className="text-gray-600">
            Explore our premium fabrics and start designing today to experience the
            Angshuk difference.
          </p>
        </div>
        <div className="text-center mt-12">
          <a
            href="/fabrics"
            className="text-soft-teal hover:underline text-lg"
          >
            Learn About Our Fabrics
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;