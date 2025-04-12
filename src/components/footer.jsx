import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-deep-charcoal py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <a
            href="https://facebook.com/angshuk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-off-white hover:text-soft-teal transition"
          >
            <i className="fab fa-facebook-f text-2xl"></i>
          </a>
          <a
            href="https://instagram.com/angshuk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-off-white hover:text-soft-teal transition"
          >
            <i className="fab fa-instagram text-2xl"></i>
          </a>
          <a
            href="https://twitter.com/angshuk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-off-white hover:text-soft-teal transition"
          >
            <i className="fab fa-twitter text-2xl"></i>
          </a>
        </div>
        <p className="text-center text-gray-400 mt-4">
          © 2025 Angshuk. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;