import React from "react";
import { Link } from "react-router-dom";
import { FaGlobeAsia, FaMapMarkedAlt, FaStar, FaCompass } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Footer from "../components/Footer";

const features = [
  {
    icon: <FaCompass className="text-3xl text-blue-500" />,
    title: "Smart Recommendations",
    desc: "Get personalized destination suggestions based on your preferences.",
  },
  {
    icon: <FaMapMarkedAlt className="text-3xl text-green-500" />,
    title: "Interactive Map",
    desc: "Explore places with an interactive map and plan your routes.",
  },
  {
    icon: <FaStar className="text-3xl text-yellow-500" />,
    title: "User Reviews",
    desc: "Read and share real traveler reviews to make informed decisions.",
  },
  {
    icon: <FaGlobeAsia className="text-3xl text-pink-500" />,
    title: "Trending Spots",
    desc: "Discover trending travel spots, events, and seasonal attractions.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const floatVariant = {
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 shadow-md bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TravelGenius
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <Link to="/login">
            <button className="px-4 py-2 text-sm sm:text-base font-semibold border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition duration-200">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 text-sm sm:text-base font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200">
              SignUp
            </button>
          </Link>
        </div>
      </header>

      <section className="flex flex-col md:flex-row items-center justify-between p-10">
        <motion.div
          className="max-w-xl space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Discover Your Perfect Destination ✈️
          </h2>
          <p className="text-lg text-gray-600">
            TravelGenius helps you find travel destinations that match your
            interests, style, and budget. Plan smarter, travel better.
          </p>
          <Link to="/login">
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
        <motion.img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Travel"
          className="w-full md:w-1/2 rounded-lg mt-10 md:mt-0 shadow-lg"
          variants={floatVariant}
          animate="float"
        />
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-100">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-center mb-16 text-blue-900"
        >
          Why Choose TravelGenius?
        </motion.h3>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6 md:px-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-400"
              whileHover={{
                y: -5,
                boxShadow: "0px 8px 20px rgba(59,130,246,0.3)",
              }}
            >
              <div className="text-blue-600 text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
