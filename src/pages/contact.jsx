import React, { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! (Placeholder)');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-off-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-deep-charcoal text-center mb-8">
          Contact Us
        </h1>
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow">
          <p className="text-gray-600 text-center mb-6">
            Have questions? Reach out, and we’ll get back to you soon!
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-deep-charcoal mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-soft-teal"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-deep-charcoal mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-soft-teal"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-deep-charcoal mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-soft-teal"
                rows="4"
                required
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
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Or reach us at{' '}
            <a href="mailto:contact@angshuk.com" className="text-soft-teal hover:underline">
              contact@angshuk.com
            </a>{' '}
            | +880-123-456-7890
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;