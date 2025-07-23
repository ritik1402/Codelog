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
      {isOpen && (
        <div className="dropdown-menu flex flex-col mt-4 absolute top-2 right-2 w-40 rounded-lg shadow-lg p-2 bg-black text-[#DCD7C9] font-medium transition-all duration-700 ease-in-out">
          <button
            onClick={handleEdit}
            className="dropdown-item-button cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="dropdown-item-button cursor-pointer mt-1"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDown;
