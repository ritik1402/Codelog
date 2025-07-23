import React, { useState } from 'react';
import { EllipsisVertical } from 'lucide-react'; 

const DropDown = ({ onEdit, onDelete }) => { 
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    onEdit(); 
    setIsOpen(false); 
  };

  const handleDelete = () => {
    onDelete(); 
    setIsOpen(false); 
  };

  return (
    <div className="dropdown-container relative">
      <button onClick={toggleDropdown} className="dropdown-toggle-button">
        <EllipsisVertical /> 
      </button>
      {isOpen && (
        <div className="dropdown-menu flex flex-col mt-4 absolute top-2 right-2 w-40  rounded-lg shadow-lg p-4 bg-black text-[#DCD7C9]  via-transparent  font-medium">
          <button onClick={handleEdit} className="dropdown-item-button">
            Edit
          </button>
          <button onClick={handleDelete} className="dropdown-item-button">
            Delete
          </button>
           
        </div>
      )}
       
    </div>
  );
};

export default DropDown;
