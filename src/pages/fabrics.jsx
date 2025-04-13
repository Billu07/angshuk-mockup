import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion, AnimatePresence } from 'framer-motion';

// Import fabric images
import boxMesh1 from '/src/assets/Fabrics/box-mesh/image1.jpg';
import boxMesh2 from '/src/assets/Fabrics/box-mesh/image2.jpg';
import boxMesh3 from '/src/assets/Fabrics/box-mesh/image3.jpg';
import chinigura1 from '/src/assets/Fabrics/chinigura/image1.jpg';
import chinigura2 from '/src/assets/Fabrics/chinigura/image2.jpg';
import chinigura3 from '/src/assets/Fabrics/chinigura/image3.jpg';
import honeycomb1 from '/src/assets/Fabrics/honeycomb/image1.jpg';
import honeycomb2 from '/src/assets/Fabrics/honeycomb/image2.jpg';
import honeycomb3 from '/src/assets/Fabrics/honeycomb/image3.jpg';
import jacquard1 from '/src/assets/Fabrics/jacquard/image1.jpg';
import jacquard2 from '/src/assets/Fabrics/jacquard/image2.jpg';
import jacquard3 from '/src/assets/Fabrics/jacquard/image3.jpg';
import pp1 from '/src/assets/Fabrics/pp/image1.jpg';
import pp2 from '/src/assets/Fabrics/pp/image2.jpg';
import pp3 from '/src/assets/Fabrics/pp/image3.jpg';
import premiumJacquard1 from '/src/assets/Fabrics/premium-jacquard/image1.jpg';
import premiumJacquard2 from '/src/assets/Fabrics/premium-jacquard/image2.jpg';
import premiumJacquard3 from '/src/assets/Fabrics/premium-jacquard/image3.jpg';

// Fabrics array
const fabrics = [
  {
    name: 'Jacquard',
    price: 350,
    desc: 'A richly woven fabric with intricate patterns, perfect for premium jerseys with a sophisticated look.',
    images: [
      { src: jacquard1, alt: 'Jacquard Jersey Front' },
      { src: jacquard2, alt: 'Jacquard Jersey Side' },
      { src: jacquard3, alt: 'Jacquard Detail' },
    ],
  },
  {
    name: 'Premium Jacquard',
    price: 400,
    desc: 'The ultimate luxury fabric, offering unmatched softness and durability for top-tier jerseys.',
    images: [
      { src: premiumJacquard1, alt: 'Premium Jacquard Jersey' },
      { src: premiumJacquard2, alt: 'Premium Jacquard Back' },
      { src: premiumJacquard3, alt: 'Premium Jacquard Texture' },
    ],
  },
  {
    name: 'Box Mesh',
    price: 300,
    desc: 'Highly breathable with a grid-like structure, ideal for athletic jerseys needing ventilation.',
    images: [
      { src: boxMesh1, alt: 'Box Mesh Jersey' },
      { src: boxMesh2, alt: 'Box Mesh Side' },
      { src: boxMesh3, alt: 'Box Mesh Pattern' },
    ],
  },
  {
    name: 'Chinigura',
    price: 320,
    desc: 'A textured weave with a unique feel, blending style and comfort for standout jerseys.',
    images: [
      { src: chinigura1, alt: 'Chinigura Jersey' },
      { src: chinigura2, alt: 'Chinigura Front' },
      { src: chinigura3, alt: 'Chinigura Texture' },
    ],
  },
  {
    name: 'Honeycomb',
    price: 310,
    desc: 'Lightweight with a hexagonal pattern, offering a modern aesthetic and breathability.',
    images: [
      { src: honeycomb1, alt: 'Honeycomb Jersey' },
      { src: honeycomb2, alt: 'Honeycomb Side' },
      { src: honeycomb3, alt: 'Honeycomb Pattern' },
    ],
  },
  {
    name: 'PP',
    price: 290,
    desc: 'A durable, budget-friendly fabric designed for long-lasting jerseys without compromising quality.',
    images: [
      { src: pp1, alt: 'PP Jersey' },
      { src: pp2, alt: 'PP Front' },
      { src: pp3, alt: 'PP Fabric' },
    ],
  },
];

function Fabrics() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

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
              <h3 className="text-xl font-semibold text-deep-charcoal text-center">
                {fabric.name}
              </h3>
              <div className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fabric.images.map((image, index) => (
                    <div
                      key={index}
                      className="bg-off-white p-4 rounded-lg shadow hover:shadow-lg transition-transform hover:scale-105 cursor-pointer"
                      onClick={() => handleImageClick(image)}
                    >
                      <LazyLoadImage
                        src={image.src}
                        alt={image.alt}
                        effect="blur"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <p className="text-sm text-gray-600 text-center">{image.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center mt-4">৳{fabric.price} per unit</p>
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-off-white p-6 rounded-lg shadow-lg relative max-w-[80vw] max-h-[80vh] overflow-auto"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full max-w-[80vw] max-h-[80vh] object-contain"
              />
              <button
                className="absolute top-2 right-2 text-deep-charcoal bg-off-white rounded-full p-2 hover:bg-gray-200 transition"
                onClick={handleCloseModal}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Fabrics;