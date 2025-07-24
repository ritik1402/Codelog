import React, { useState } from 'react';
import { EllipsisVertical } from 'lucide-react';

const DropDown = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(e);
    setIsOpen(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(e);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container relative">
      <button
        onClick={toggleDropdown}
        className="dropdown-toggle-button cursor-pointer"
      >
        <EllipsisVertical />
      </button>

      <div
        className={`
          absolute top-2 right-2 mt-4 w-40 rounded-lg shadow-lg p-2 
          bg-white text-black font-medium flex flex-col 
          transition-all duration-300 ease-in-out transform 
          ${isOpen ? 'opacity-100 scale-100 translate-y-0 ' : 'opacity-0 scale-95 -translate-y-2'}
        `}
      >
        <button onClick={handleEdit} className="cursor-pointer">
          Edit
        </button>
        <button onClick={handleDelete} className="cursor-pointer mt-1 border-t-1 border-[#A27B5C]">
          Delete
        </button>
      </div>
    </div>
  );
};

export default DropDown;
