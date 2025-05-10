import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      <h2 className="text-4xl font-bold text-orange-500 mb-8">Contact Us</h2>

      {/* Contact Information */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 mb-10">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">Get In Touch</h3>
        
        {/* Phone and Email */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <span className="text-xl text-gray-600 mr-4">📞</span>
            <a href="tel:+123456789" className="text-lg text-orange-500 hover:text-orange-600">
              +1 234 567 89
            </a>
          </div>
          <div className="flex items-center">
            <span className="text-xl text-gray-600 mr-4">📧</span>
            <a href="mailto:info@example.com" className="text-lg text-orange-500 hover:text-orange-600">
              info@example.com
            </a>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6">
          <a href="https://www.facebook.com" className="text-3xl text-gray-600 hover:text-orange-500">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.twitter.com" className="text-3xl text-gray-600 hover:text-orange-500">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com" className="text-3xl text-gray-600 hover:text-orange-500">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com" className="text-3xl text-gray-600 hover:text-orange-500">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">We'd love to hear from you!</h3>

        {/* Form */}
        <form className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-600 font-medium">Your Name</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-600 font-medium">Your Email</label>
            <input
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-gray-600 font-medium">Your Message</label>
            <textarea
              id="message"
              rows="4"
              placeholder="Write your message here..."
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Footer Section */}
      <div className="mt-10 text-center text-gray-600">
        <p className="text-sm">© 2025 Your Company Name. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Contact;
