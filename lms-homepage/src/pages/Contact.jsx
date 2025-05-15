import React from "react";
import contactImage from "../assets/contact.jpg"; // Import the image from assets

const Contact = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative">
        <img
          src={contactImage} // Use imported image here
          alt="Background"
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-semibold italic">Contact Us</h1>
        </div>
      </div>

      {/* Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-10 bg-gray-100">
        {/* Google Map with Agra Location (Learn 2 Earn) */}
        <div className="h-64">
          <iframe
            className="w-full h-full rounded-md shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.0723357428337!2d78.00741417471504!3d27.17823324964927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974711910e72d3b%3A0xb009d62246d56b98!2sLearn%202%20Earn!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">Meet Us</h2>
          <p className="flex items-center space-x-2">
            <span>📞</span> <span>+466723723666</span>
          </p>
          <p className="flex items-center space-x-2">
            <span>📧</span> <span>contact@admin.com</span>
          </p>
          <p className="flex items-center space-x-2">
            <span>📍</span> <span>Learn 2 Earn, Agra, India</span>
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-200 p-6 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">Contact</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Message"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
            ></textarea>
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-md hover:opacity-90">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;