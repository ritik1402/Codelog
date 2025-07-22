import React from "react";

const Modal = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#2C3639] text-[#DCD7C9] rounded-xl shadow-xl p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
