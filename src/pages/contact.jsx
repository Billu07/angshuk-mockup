import React from 'react';

function Contact() {
  return (
    <div className="min-h-screen bg-off-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-deep-charcoal text-center mb-8">
          Contact Us
        </h1>
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow mb-12">
          <form>
            <div className="mb-4">
              <label className="block text-deep-charcoal mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-soft-teal"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-deep-charcoal mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-soft-teal"
                placeholder="your.email@example.com"
              />
            </div>
            <div className="mb-4">
              <label className="block text-deep-charcoal mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-soft-teal"
                rows="4"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-soft-teal text-off-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-2">Email: support@angshuk.com</p>
          <p className="text-gray-600 mb-6">Phone: +880 123 456 7890</p>
          {/* Add Social Media Links */}
          <h3 className="text-xl font-semibold text-deep-charcoal mb-4">
            Follow Us
          </h3>
          <div className="flex justify-center space-x-6">
            <a
              href="https://facebook.com/angshuk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-deep-charcoal hover:text-soft-teal transition"
            >
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a
              href="https://instagram.com/angshuk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-deep-charcoal hover:text-soft-teal transition"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a
              href="https://twitter.com/angshuk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-deep-charcoal hover:text-soft-teal transition"
            >
              <i className="fab fa-twitter text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;