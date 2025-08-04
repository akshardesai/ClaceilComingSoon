import React, { useState } from "react";

const ContactUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    setIsModalOpen(false);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 tracking-wide"
      >
        CONTACT US
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          
          {/* Modal Container */}
          <div
            className={`relative w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-out ${
              isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-600 hover:text-gray-800"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="px-6 pt-6 pb-2">
              <h2 className="text-2xl font-light text-gray-900 tracking-wide text-center">Get in Touch</h2>
              <p className="text-sm text-gray-500 mt-1 text-center">We'd love to hear from you</p>
            </div>

            {/* Modal Body - Form */}
            <form onSubmit={handleSubmit} className="px-6 pb-6">
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                    placeholder="Tell us more..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 tracking-wide"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactUs;