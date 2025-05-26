"use client";

import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaExpand } from "react-icons/fa";

export default function Gallery({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  // If there are no images, display a placeholder
  if (images.length === 0) {
    return (
      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
        <div className="bg-gray-100 rounded-lg p-10 text-center text-gray-500">
          No portfolio images available
        </div>
      </div>
    );
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Gallery</h2>

      {/* Main gallery grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-48 bg-gray-200 rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => openModal(index)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-400">Image {index + 1}</span>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <FaExpand className="text-white text-xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Modal for fullscreen view */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setIsModalOpen(false)}
          >
            ✕
          </button>

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 p-2 rounded-full"
            onClick={handlePrevious}
          >
            <FaArrowLeft className="text-white" />
          </button>

          <div className="max-w-4xl max-h-[80vh] relative">
            <div className="h-[80vh] bg-gray-800 flex items-center justify-center">
              <span className="text-white">Image {currentIndex + 1}</span>
            </div>
          </div>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 p-2 rounded-full"
            onClick={handleNext}
          >
            <FaArrowRight className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
