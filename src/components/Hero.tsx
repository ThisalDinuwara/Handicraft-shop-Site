import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/6069118/pexels-photo-6069118.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Sri Lankan Handicrafts"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/90 via-red-900/85 to-red-800/90"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="container mx-auto px-4 text-center text-white relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-red-800/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-red-700">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">Authentic Sri Lankan Handicrafts</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-yellow-300">Kandu</span>
            <br />
            <span className="text-white">Pinnawala</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-red-100 mb-8 leading-relaxed">
            Discover the rich heritage of Sri Lankan craftsmanship through our 
            <br className="hidden md:block" />
            exquisite collection of traditional handicrafts and artisanal treasures
          </p>

          {/* Description */}
          <p className="text-lg text-red-200 mb-10 max-w-2xl mx-auto">
            From intricately carved wooden masks to handwoven textiles, each piece tells a story 
            of generations-old traditions passed down through skilled artisans in the heart of Sri Lanka.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="group bg-yellow-500 hover:bg-yellow-400 text-red-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
              <span>Explore Collection</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-red-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              Learn Our Story
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-red-700/50">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">500+</div>
              <div className="text-red-200">Unique Items</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">25+</div>
              <div className="text-red-200">Master Artisans</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">15</div>
              <div className="text-red-200">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;