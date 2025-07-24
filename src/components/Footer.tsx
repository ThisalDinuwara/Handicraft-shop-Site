import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Products', href: '#products' },
    { name: 'About Us', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const categories = [
    { name: 'Traditional Masks', href: '#' },
    { name: 'Handwoven Textiles', href: '#' },
    { name: 'Wood Carvings', href: '#' },
    { name: 'Pottery & Ceramics', href: '#' },
    { name: 'Jewelry & Accessories', href: '#' },
  ];

  const customerService = [
    { name: 'Shipping Information', href: '#' },
    { name: 'Return Policy', href: '#' },
    { name: 'Size Guide', href: '#' },
    { name: 'Care Instructions', href: '#' },
    { name: 'FAQ', href: '#' },
  ];

  return (
    <footer className="bg-red-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-yellow-300">K</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-yellow-300">Kandu Pinnawala</h3>
                  <p className="text-sm text-red-200">Traditional Handicrafts</p>
                </div>
              </div>
              
              <p className="text-red-200 mb-6 leading-relaxed">
                Preserving Sri Lankan heritage through authentic handicrafts. 
                Each piece tells a story of tradition, skill, and cultural pride.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-red-200">123 Handicraft Street, Pinnawala, Sri Lanka</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-red-200">+94 77 123 4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-red-200">info@kandupinnawala.lk</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold text-yellow-300 mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-red-200 hover:text-yellow-300 transition-colors duration-300 flex items-center space-x-2 group"
                    >
                      <span className="w-1 h-1 bg-red-400 rounded-full group-hover:bg-yellow-400 transition-colors"></span>
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Categories */}
            <div>
              <h4 className="text-xl font-bold text-yellow-300 mb-6">Categories</h4>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <li key={index}>
                    <a
                      href={category.href}
                      className="text-red-200 hover:text-yellow-300 transition-colors duration-300 flex items-center space-x-2 group"
                    >
                      <span className="w-1 h-1 bg-red-400 rounded-full group-hover:bg-yellow-400 transition-colors"></span>
                      <span>{category.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-xl font-bold text-yellow-300 mb-6">Customer Service</h4>
              <ul className="space-y-3 mb-6">
                {customerService.map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      className="text-red-200 hover:text-yellow-300 transition-colors duration-300 flex items-center space-x-2 group"
                    >
                      <span className="w-1 h-1 bg-red-400 rounded-full group-hover:bg-yellow-400 transition-colors"></span>
                      <span>{service.name}</span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Social Links */}
              <div>
                <h5 className="text-lg font-semibold text-yellow-300 mb-4">Follow Us</h5>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-red-800 hover:bg-yellow-500 text-white hover:text-red-900 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-red-800">
          <div className="text-center">
            <h4 className="text-2xl font-bold text-yellow-300 mb-4">Stay Updated</h4>
            <p className="text-red-200 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive updates about new products, special offers, 
              and insights into Sri Lankan handicraft traditions.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-red-800 border border-red-700 rounded-lg text-white placeholder-red-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors"
              />
              <button className="bg-yellow-500 hover:bg-yellow-400 text-red-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-red-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-red-300 text-sm">
              © 2024 Kandu Pinnawala. All rights reserved. Preserving Sri Lankan heritage with pride.
            </div>
            <div className="flex items-center space-x-2 text-red-300 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>in Sri Lanka</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;