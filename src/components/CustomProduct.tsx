import React, { useState } from 'react';
import { X, Upload, Palette, Ruler, MessageSquare } from 'lucide-react';

interface CustomProductProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomProduct: React.FC<CustomProductProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    productType: '',
    size: '',
    colors: [] as string[],
    materials: [] as string[],
    description: '',
    budget: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const productTypes = [
    'Traditional Mask',
    'Wood Carving',
    'Batik Textile',
    'Pottery Item',
    'Jewelry Piece',
    'Home Decoration',
    'Custom Design',
  ];

  const availableColors = [
    'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Black', 'White', 'Brown', 'Gold'
  ];

  const materials = [
    'Wood', 'Clay', 'Cotton', 'Silk', 'Silver', 'Brass', 'Coconut Shell', 'Bamboo'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColorToggle = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handleMaterialToggle = (material: string) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.includes(material)
        ? prev.materials.filter(m => m !== material)
        : [...prev.materials, material],
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you'd upload to a server
      // For demo, we'll just create placeholder URLs
      const newImages = Array.from(files).map((file, index) => 
        `https://images.pexels.com/photos/606069${120 + uploadedImages.length + index}/pexels-photo-606069${120 + uploadedImages.length + index}.jpeg?auto=compress&cs=tinysrgb&w=200`
      );
      setUploadedImages(prev => [...prev, ...newImages]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Custom product request:', formData);
    // Handle form submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-red-100 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-red-900">Custom Product Request</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-red-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Product Type */}
          <div>
            <label className="block text-lg font-semibold text-red-900 mb-4">
              What would you like us to create?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {productTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, productType: type }))}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    formData.productType === type
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : 'border-red-200 hover:border-red-300 text-red-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Size & Dimensions */}
          <div>
            <label htmlFor="size" className="block text-lg font-semibold text-red-900 mb-3">
              <Ruler className="w-5 h-5 inline mr-2" />
              Size & Dimensions
            </label>
            <textarea
              id="size"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Please specify dimensions, size requirements, or any measurements..."
            />
          </div>

          {/* Colors */}
          <div>
            <label className="block text-lg font-semibold text-red-900 mb-3">
              <Palette className="w-5 h-5 inline mr-2" />
              Preferred Colors
            </label>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {availableColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorToggle(color)}
                  className={`p-2 rounded-lg border-2 text-xs font-medium transition-all ${
                    formData.colors.includes(color)
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : 'border-red-200 hover:border-red-300 text-red-700'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div>
            <label className="block text-lg font-semibold text-red-900 mb-3">
              Preferred Materials
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {materials.map((material) => (
                <button
                  key={material}
                  type="button"
                  onClick={() => handleMaterialToggle(material)}
                  className={`p-2 rounded-lg border-2 text-sm font-medium transition-all ${
                    formData.materials.includes(material)
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : 'border-red-200 hover:border-red-300 text-red-700'
                  }`}
                >
                  {material}
                </button>
              ))}
            </div>
          </div>

          {/* Reference Images */}
          <div>
            <label className="block text-lg font-semibold text-red-900 mb-3">
              <Upload className="w-5 h-5 inline mr-2" />
              Reference Images
            </label>
            <div className="border-2 border-dashed border-red-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-red-700 font-medium mb-2">Upload reference images</p>
                <p className="text-red-500 text-sm">Click to browse or drag and drop images here</p>
              </label>
            </div>
            
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {uploadedImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Reference ${index + 1}`}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-lg font-semibold text-red-900 mb-3">
              <MessageSquare className="w-5 h-5 inline mr-2" />
              Detailed Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className="w-full px-4 py-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Please provide detailed description of what you want, including any specific cultural significance, patterns, or special requirements..."
            />
          </div>

          {/* Budget & Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="budget" className="block text-lg font-semibold text-red-900 mb-3">
                Budget Range (LKR)
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select budget range</option>
                <option value="5000-10000">5,000 - 10,000 LKR</option>
                <option value="10000-25000">10,000 - 25,000 LKR</option>
                <option value="25000-50000">25,000 - 50,000 LKR</option>
                <option value="50000-100000">50,000 - 100,000 LKR</option>
                <option value="100000+">100,000+ LKR</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="timeline" className="block text-lg font-semibold text-red-900 mb-3">
                Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select timeline</option>
                <option value="1-2weeks">1-2 weeks</option>
                <option value="3-4weeks">3-4 weeks</option>
                <option value="1-2months">1-2 months</option>
                <option value="2-3months">2-3 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-red-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-red-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-red-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-red-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-red-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-red-900 hover:bg-red-800 text-white rounded-lg font-semibold transition-colors"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomProduct;