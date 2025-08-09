import React, { useState, useEffect } from "react";
import { contactUsDB } from "./appwrite";

const ContactUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [notification, setNotification] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    if (!formData.email || formData.email.length <= 0) {
      return;
    }

    const response = await contactUsDB(formData);

    if (response.success) {
      console.log("form submitted");
      setNotification(true);

      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification(false);
      }, 2000);

      closeModal();
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      alert("Failed to send message");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setIsVisible(true), 10);
  };

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => setIsModalOpen(false), 300);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <>
      <button
        onClick={openModal}
        className="bg-white text-black font-light px-6 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 tracking-wide shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
      >
        CONTACT US
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          {/* Modal Container */}
          <div
            className={`relative w-full max-w-md bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-out ${
              isVisible
                ? "scale-100 opacity-100 translate-y-0 rotate-0"
                : "scale-90 opacity-0 translate-y-8 -rotate-1"
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{
              transformOrigin: "center center",
              animation: isVisible
                ? "modalBounceIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
                : "none",
            }}
          >
            {/* Animated gradient border */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5 transition-opacity duration-500 ${
                isVisible ? "opacity-20" : "opacity-0"
              }`}
            >
              <div className="bg-white rounded-2xl w-full h-full"></div>
            </div>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all duration-200 text-gray-600 transform hover:scale-110 active:scale-95 z-10"
              style={{
                animation: isVisible
                  ? "fadeInRotate 0.5s ease-out 0.2s backwards"
                  : "none",
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Header */}
            <div
              className={`px-6 pt-6 pb-2 transition-all duration-600 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }`}
              style={{
                animation: isVisible
                  ? "slideInDown 0.6s ease-out 0.1s backwards"
                  : "none",
              }}
            >
              <h2 className="text-2xl font-light text-gray-900 tracking-wide text-center bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text">
                Get in Touch
              </h2>
              <p className="text-sm text-gray-500 mt-1 text-center">
                We'd love to hear from you
              </p>
              <div className="w-12 h-0.5 bg-gradient-to-r from-gray-900 to-gray-400 mx-auto mt-3 rounded-full"></div>
            </div>

            {/* Modal Body */}
            <div className="px-6 pb-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Name Field */}
                  <div
                    className={`transition-all duration-600 ease-out ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{
                      animation: isVisible
                        ? "slideInUp 0.6s ease-out 0.2s backwards"
                        : "none",
                    }}
                  >
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="text-black w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white hover:border-gray-300 transform focus:scale-[1.02] hover:shadow-md"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div
                    className={`transition-all duration-600 ease-out ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{
                      animation: isVisible
                        ? "slideInUp 0.6s ease-out 0.3s backwards"
                        : "none",
                    }}
                  >
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="text-black w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white hover:border-gray-300 transform focus:scale-[1.02] hover:shadow-md"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Subject Field */}
                  <div
                    className={`transition-all duration-600 ease-out ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{
                      animation: isVisible
                        ? "slideInUp 0.6s ease-out 0.4s backwards"
                        : "none",
                    }}
                  >
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="text-black w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white hover:border-gray-300 transform focus:scale-[1.02] hover:shadow-md"
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <div
                    className={`transition-all duration-600 ease-out ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{
                      animation: isVisible
                        ? "slideInUp 0.6s ease-out 0.5s backwards"
                        : "none",
                    }}
                  >
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="text-black w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-300 bg-gray-50 focus:bg-white resize-none hover:border-gray-300 transform focus:scale-[1.02] hover:shadow-md"
                      placeholder="Tell us more..."
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div
                    className={`flex gap-4 pt-2 transition-all duration-600 ease-out ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{
                      animation: isVisible
                        ? "slideInUp 0.6s ease-out 0.6s backwards"
                        : "none",
                    }}
                  >
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 tracking-wide transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative flex items-center justify-center">
                        Send Message
                        <svg
                          className="w-4 h-4 ml-2 mt-1 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </span>
                    </button>

                    <a
                      href="tel:+919998089866"
                      className="w-1/4 bg-black text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 tracking-wide transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative flex items-center justify-center">
                        <i className="ri-phone-fill text-white"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {
        <div
          className={`bg-black fixed top-10 -right-1 w-[35%] sm:w-[17%] h-14 rounded-l-2xl border-2 border-gray-400 flex justify-center items-center transition duration-500 ease-in-out transform ${
            notification ? "translate-x-0" : "translate-x-46 sm:translate-x-64"
          } `}
        >
          <p className="font-mono">
            <i className="ri-checkbox-circle-fill text-lg text-lime-400"></i>{" "}
            Message Sent
          </p>
        </div>
      }

      <style jsx>{`
        @keyframes modalBounceIn {
          0% {
            transform: scale(0.3) translateY(50px) rotate(-5deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) translateY(-10px) rotate(1deg);
            opacity: 0.8;
          }
          70% {
            transform: scale(0.98) translateY(2px) rotate(-0.5deg);
            opacity: 0.9;
          }
          100% {
            transform: scale(1) translateY(0) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes slideInDown {
          0% {
            transform: translateY(-30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInRotate {
          0% {
            transform: rotate(-180deg) scale(0);
            opacity: 0;
          }
          100% {
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default ContactUs;
