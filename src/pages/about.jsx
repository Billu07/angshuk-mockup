import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Helmet } from 'react-helmet';

// Import images explicitly for Vite bundling
import image1 from '/src/assets/about-gallery/image1.jpg';
import image2 from '/src/assets/about-gallery/image2.jpg';
import image3 from '/src/assets/about-gallery/image3.jpg';
import image4 from '/src/assets/about-gallery/image4.jpg';
import image5 from '/src/assets/about-gallery/image5.jpg';
import image6 from '/src/assets/about-gallery/image6.jpg';
import image7 from '/src/assets/about-gallery/image7.jpg';
import image8 from '/src/assets/about-gallery/image8.jpg';
import image9 from '/src/assets/about-gallery/image9.jpg';
import image10 from '/src/assets/about-gallery/image10.jpg';
import image11 from '/src/assets/about-gallery/image11.jpg';
import image12 from '/src/assets/about-gallery/image12.jpg';

// Updated galleryItems with imported images
const galleryItems = [
  {
    src: image1,
    alt: 'Custom Team Jersey',
    desc: 'Designed for a local sports team',
  },
  {
    src: image2,
    alt: 'Factory Stitching Line',
    desc: 'Precision stitching by our skilled team',
  },
  {
    src: image3,
    alt: 'Corporate T-shirts',
    desc: 'Branded apparel for a business event',
  },
  {
    src: image4,
    alt: 'Fabric Cutting',
    desc: 'High-quality cuts for perfect fits',
  },
  {
    src: image5,
    alt: 'Custom Hoodie Collection',
    desc: 'Unique designs for a festival',
  },
  {
    src: image6,
    alt: 'Quality Control',
    desc: 'Ensuring every piece meets our standards',
  },
  {
    src: image7,
    alt: 'Custom Team Jersey',
    desc: 'Designed for a local sports team',
  },
  {
    src: image8,
    alt: 'Factory Stitching Line',
    desc: 'Precision stitching by our skilled team',
  },
  {
    src: image9,
    alt: 'Corporate T-shirts',
    desc: 'Branded apparel for a business event',
  },
  {
    src: image10,
    alt: 'Fabric Cutting',
    desc: 'High-quality cuts for perfect fits',
  },
  {
    src: image11,
    alt: 'Custom Hoodie Collection',
    desc: 'Unique designs for a festival',
  },
  {
    src: image12,
    alt: 'Quality Control',
    desc: 'Ensuring every piece meets our standards',
  },
];

function About() {
  return (
    <div className="min-h-screen bg-off-white pt-20 pb-10">
      <Helmet>
        <title>Angshuk - About Us</title>
        <meta
          name="description"
          content="Learn about Angshuk's mission to create high-quality custom apparel."
        />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-deep-charcoal text-center mb-8">
          About Angshuk
        </h1>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">
            Our Story
          </h2>
          <p className="text-lg text-gray-600">
            Angshuk started as a small dream to create custom apparel that blends quality and creativity. Over the years, we’ve grown into a trusted name for teams, businesses, and individuals looking to bring their ideas to life.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600">
            We aim to deliver exceptional apparel with a focus on sustainability, precision, and customer satisfaction.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-deep-charcoal text-center mb-8">
            Legacy of Craft
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="bg-off-white p-4 rounded-lg shadow hover:shadow-lg transition-transform hover:scale-105"
              >
                <LazyLoadImage
                  src={item.src}
                  alt={item.alt}
                  effect="blur"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-deep-charcoal text-center">{item.alt}</h3>
                <p className="text-sm text-gray-600 text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">
            Meet the Team
          </h2>
          <p className="text-lg text-gray-600">
            Our team of designers, tailors, and customer support specialists work together to ensure every order exceeds expectations.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;