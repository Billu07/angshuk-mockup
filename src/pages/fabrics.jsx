import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

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
import premiumJacquard1 from '/src/assets/Fabrics/premium-Jacquard/image1.jpg';
import premiumJacquard2 from '/src/assets/Fabrics/premium-Jacquard/image2.jpg';
import premiumJacquard3 from '/src/assets/Fabrics/premium-Jacquard/image3.jpg';

// Fabrics array
const fabrics = [
  {
    name: 'Jacquard',
    price: 350,
    desc: 'A richly woven fabric with intricate patterns, perfect for premium jerseys with a sophisticated look.',
    images: [
      { src: jacquard1, alt: 'Jacquard Jersey Front', caption: 'Team jersey front view' },
      { src: jacquard2, alt: 'Jacquard Jersey Side', caption: 'Side profile in action' },
      { src: jacquard3, alt: 'Jacquard Detail', caption: 'Close-up of weave' },
    ],
  },
  {
    name: 'Premium Jacquard',
    price: 400,
    desc: 'The ultimate luxury fabric, offering unmatched softness and durability for top-tier jerseys.',
    images: [
      { src: premiumJacquard1, alt: 'Premium Jacquard Jersey', caption: 'Elite team kit' },
      { src: premiumJacquard2, alt: 'Premium Jacquard Back', caption: 'Back design' },
      { src: premiumJacquard3, alt: 'Premium Jacquard Texture', caption: 'Luxury texture' },
    ],
  },
  {
    name: 'Box Mesh',
    price: 300,
    desc: 'Highly breathable with a grid-like structure, ideal for athletic jerseys needing ventilation.',
    images: [
      { src: boxMesh1, alt: 'Box Mesh Jersey', caption: 'Breathable jersey in game' },
      { src: boxMesh2, alt: 'Box Mesh Side', caption: 'Side view during play' },
      { src: boxMesh3, alt: 'Box Mesh Pattern', caption: 'Mesh pattern close-up' },
    ],
  },
  {
    name: 'Chinigura',
    price: 320,
    desc: 'A textured weave with a unique feel, blending style and comfort for standout jerseys.',
    images: [
      { src: chinigura1, alt: 'Chinigura Jersey', caption: 'Stylish team jersey' },
      { src: chinigura2, alt: 'Chinigura Front', caption: 'Front design detail' },
      { src: chinigura3, alt: 'Chinigura Texture', caption: 'Unique texture shot' },
    ],
  },
  {
    name: 'Honeycomb',
    price: 310,
    desc: 'Lightweight with a hexagonal pattern, offering a modern aesthetic and breathability.',
    images: [
      { src: honeycomb1, alt: 'Honeycomb Jersey', caption: 'Dynamic team kit' },
      { src: honeycomb2, alt: 'Honeycomb Side', caption: 'Side view in motion' },
      { src: honeycomb3, alt: 'Honeycomb Pattern', caption: 'Honeycomb pattern' },
    ],
  },
  {
    name: 'PP',
    price: 290,
    desc: 'A durable, budget-friendly fabric designed for long-lasting jerseys without compromising quality.',
    images: [
      { src: pp1, alt: 'PP Jersey', caption: 'Durable team jersey' },
      { src: pp2, alt: 'PP Front', caption: 'Front view of design' },
      { src: pp3, alt: 'PP Fabric', caption: 'Fabric durability shot' },
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
                <Swiper
                  modules={[Navigation, Thumbs]}
                  navigation
                  spaceBetween={10}
                  slidesPerView={1}
                  className="fabric-swiper"
                >
                  {fabric.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="bg-off-white p-4 rounded-lg cursor-pointer"
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
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <p className="text-sm text-gray-600 text-center mt-4">৳{fabric.price} per unit</p>
              <p className="text-gray-600 mt-2 text-center">{fabric.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/order"
            className="gradient-button text-off-white"
          >
            Start Ordering
          </Link>
        </div>
      </div>

      {/* Zoomable Modal */}
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
              className="bg-off-white p-6 rounded-lg shadow-lg relative max-w-[80vw] max-h-[80vh] overflow-visible"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <TransformWrapper
                initialScale={1}
                minScale={1}
                maxScale={4}
                wheel={{ step: 0.2 }}
                pinch={{ step: 0.05 }}
                doubleClick={{ disabled: false }}
                panning={{ velocityDisabled: false }}
              >
                <TransformComponent>
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="max-w-full max-h-[60vh] object-contain"
                  />
                </TransformComponent>
              </TransformWrapper>
              <p className="text-center text-deep-charcoal mt-4 text-sm">
                {selectedImage.caption}
              </p>
              <button
                className="absolute top-2 right-2 gradient-button text-off-white rounded-full p-2"
                onClick={handleCloseModal}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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