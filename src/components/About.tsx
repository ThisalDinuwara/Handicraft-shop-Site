import React from 'react';
import { Award, Users, Globe, Heart } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Award,
      title: 'Master Craftsmanship',
      description: 'Our artisans have honed their skills over generations, creating pieces that represent the pinnacle of Sri Lankan craftsmanship.',
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'We work directly with local artisan communities, ensuring fair wages and preserving traditional techniques.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Bringing authentic Sri Lankan handicrafts to customers worldwide while maintaining cultural authenticity.',
    },
    {
      icon: Heart,
      title: 'Passion for Heritage',
      description: 'Every piece tells a story of our rich cultural heritage, passed down through generations of skilled craftspeople.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-red-50 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-red-900 mb-6">
              About <span className="text-yellow-600">Kandu Pinnawala</span>
            </h2>
            
            <p className="text-lg text-red-700 mb-6 leading-relaxed">
              Nestled in the heart of Sri Lanka, Kandu Pinnawala has been a beacon of traditional 
              craftsmanship for over 15 years. Our journey began with a simple mission: to preserve 
              and share the incredible artisanal heritage of our beautiful island nation.
            </p>
            
            <p className="text-lg text-red-700 mb-8 leading-relaxed">
              From the ancient art of mask carving to the delicate weaving of traditional textiles, 
              each piece in our collection represents hours of meticulous work by master artisans 
              who have inherited their skills through generations of family tradition.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-white rounded-lg shadow-md border border-red-100">
                <div className="text-3xl font-bold text-red-900 mb-2">500+</div>
                <div className="text-red-600 font-medium">Unique Products</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-md border border-red-100">
                <div className="text-3xl font-bold text-red-900 mb-2">25+</div>
                <div className="text-red-600 font-medium">Master Artisans</div>
              </div>
            </div>

            <button className="bg-red-900 hover:bg-red-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Learn More About Us
            </button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/6069118/pexels-photo-6069118.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Artisan at work"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20 z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-600 rounded-full opacity-20 z-0"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-red-100"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-900 text-white rounded-full mb-4">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-red-900 mb-3">{feature.title}</h3>
              <p className="text-red-700 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;