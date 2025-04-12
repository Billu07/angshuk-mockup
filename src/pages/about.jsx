import React from 'react';

// Placeholder images for the gallery (replace with your actual images)
const galleryItems = [
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    alt: 'Custom Team Jersey 2024',
    desc: 'Designed for the championship-winning team of 2024',
  },
  {
    src: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop',
    alt: 'Factory Stitching Line',
    desc: 'Our skilled team at work, ensuring precision in every stitch',
  },
  {
    src: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop',
    alt: 'Corporate T-shirts 2023',
    desc: 'Branded T-shirts for a corporate event, blending style and comfort',
  },
  {
    src: 'https://images.unsplash.com/photo-1582213781779-0a8a5a6e3e7c?q=80&w=2070&auto=format&fit=crop',
    alt: 'Factory Fabric Cutting',
    desc: 'High-quality fabric cutting for perfect fits',
  },
  {
    src: 'https://images.unsplash.com/photo-1572795768287-4f46a1eb24b8?q=80&w=2070&auto=format&fit=crop',
    alt: 'Custom Hoodie Collection',
    desc: 'Limited edition hoodies for a local music festival',
  },
  {
    src: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2070&auto=format&fit=crop',
    alt: 'Quality Control Station',
    desc: 'Every piece undergoes strict quality checks',
  },
];

function About() {
  return (
    <div className="min-h-screen bg-off-white pt-20 pb-10">
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
        {/* Add Gallery Section Here */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-deep-charcoal text-center mb-8">
            Legacy of Craft
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-off-white">
                    <h3 className="text-lg font-semibold">{item.alt}</h3>
                    <p className="text-sm">{item.desc}</p>
                  </div>
                </div>
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