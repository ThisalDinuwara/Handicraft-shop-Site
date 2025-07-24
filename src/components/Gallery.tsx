import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/6069119/pexels-photo-6069119.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Traditional Mask Making',
      category: 'Craftsmanship',
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/6069120/pexels-photo-6069120.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Batik Textile Art',
      category: 'Textiles',
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/6069121/pexels-photo-6069121.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Wood Carving Workshop',
      category: 'Wood Crafts',
    },
    {
      id: 4,
      src: 'https://images.pexels.com/photos/6069122/pexels-photo-6069122.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Pottery Creation',
      category: 'Pottery',
    },
    {
      id: 5,
      src: 'https://images.pexels.com/photos/6069123/pexels-photo-6069123.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Jewelry Crafting',
      category: 'Jewelry',
    },
    {
      id: 6,
      src: 'https://images.pexels.com/photos/6069124/pexels-photo-6069124.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Cultural Heritage',
      category: 'Heritage',
    },
    {
      id: 7,
      src: 'https://images.pexels.com/photos/6069125/pexels-photo-6069125.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Artisan at Work',
      category: 'Craftsmanship',
    },
    {
      id: 8,
      src: 'https://images.pexels.com/photos/6069126/pexels-photo-6069126.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Traditional Designs',
      category: 'Heritage',
    },
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-red-50 to-white relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
            Our <span className="text-yellow-600">Gallery</span>
          </h2>
          <p className="text-xl text-red-700 max-w-3xl mx-auto leading-relaxed">
            Take a glimpse into our workshop and see the incredible artistry that goes into 
            creating each unique piece in our collection
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block bg-yellow-500 text-red-900 px-3 py-1 rounded-full text-xs font-bold mb-2">
                    {image.category}
                  </span>
                  <h3 className="text-white font-bold text-lg">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  <span className="inline-block bg-yellow-500 text-red-900 px-3 py-1 rounded-full text-sm font-bold mb-2">
                    {galleryImages[selectedImage].category}
                  </span>
                  <h3 className="text-white font-bold text-xl">
                    {galleryImages[selectedImage].title}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;