import React from "react";
import { MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">TravelGenius</span>
        </div>

        <div className="text-center text-gray-400">
          <p>&copy; 2025 TravelGenius. All rights reserved.</p>
          <p className="mt-2">Discover. Explore. Experience.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
