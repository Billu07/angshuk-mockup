import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Restored full fabrics array
const fabrics = [
  {
    name: 'Jacquard',
    price: 350,
    desc: 'A richly woven fabric with intricate patterns, perfect for premium jerseys with a sophisticated look.',
    preview: 'linear-gradient(45deg, #4B5EAA, #6B7280)',
  },
  {
    name: 'Premium Jacquard',
    price: 400,
    desc: 'The ultimate luxury fabric, offering unmatched softness and durability for top-tier jerseys.',
    preview: 'linear-gradient(45deg, #2D3748, #4A5568)',
  },
  {
    name: 'Box Mesh',
    price: 300,
    desc: 'Highly breathable with a grid-like structure, ideal for athletic jerseys needing ventilation.',
    preview: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect x=\'0\' y=\'0\' width=\'10\' height=\'10\' fill=\'%23A0AEC0\'/%3E%3Crect x=\'10\' y=\'10\' width=\'10\' height=\'10\' fill=\'%23A0AEC0\'/%3E%3C/svg%3E")',
  },
  {
    name: 'Chinigura',
    price: 320,
    desc: 'A textured weave with a unique feel, blending style and comfort for standout jerseys.',
    preview: 'linear-gradient(45deg, #718096, #A0AEC0)',
  },
  {
    name: 'Honeycomb',
    price: 310,
    desc: 'Lightweight with a hexagonal pattern, offering a modern aesthetic and breathability.',
    preview: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 2L12 6H8L10 2Z M10 8L12 12H8L10 8Z M10 14L12 18H8L10 14Z\' fill=\'%23718096\'/%3E%3C/svg%3E")',
  },
  {
    name: 'PP',
    price: 290,
    desc: 'A durable, budget-friendly fabric designed for long-lasting jerseys without compromising quality.',
    preview: 'linear-gradient(45deg, #CBD5E0, #E2E8F0)',
  },
];

function Fabrics() {
  return (
    <div className="min-h-screen bg-off-white pt-20 pb-10">
      <Helmet>
        <title>Angshuk - Jersey Fabrics</title>
        <meta
          name="description"
          content="Explore Angshuk's premium jersey fabrics for custom apparel."
        />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-deep-charcoal text-center mb-8">
          Jersey Fabric Details
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore our premium fabrics for jerseys, each crafted to meet your needs for style, comfort, and durability.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fabrics.map((fabric) => (
            <div
              key={fabric.name}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div
                className="w-24 h-24 rounded mx-auto mb-4"
                style={{ background: fabric.preview }}
              ></div>
              <h3 className="text-xl font-semibold text-deep-charcoal text-center">
                {fabric.name}
              </h3>
              <p className="text-sm text-gray-600 text-center mt-2">৳{fabric.price} per unit</p>
              <p className="text-gray-600 mt-2 text-center">{fabric.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/order"
            className="bg-soft-teal text-off-white px-6 py-3 rounded-lg hover:bg-teal-600 transition"
          >
            Start Ordering
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Fabrics;