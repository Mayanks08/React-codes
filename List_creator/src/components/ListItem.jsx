import  { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const ListItem = ({ item, onMoveItem, onUpdateItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name || item.title);

  const handleMoveLeft = () => {
    if (onMoveItem) {
      onMoveItem(item, 'left');
    }
  };

  const handleMoveRight = () => {
    if (onMoveItem) {
      onMoveItem(item, 'right');
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedName.trim()) {
      onUpdateItem({ ...item, name: editedName.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedName(item.name || item.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <li className="list-item animate-slide-in">
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-2 py-1 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="p-1.5 text-green-600 hover:text-green-700 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Save changes"
          >
            <FaCheck />
          </button>
          <button
            onClick={handleCancel}
            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Cancel editing"
          >
            <FaTimes />
          </button>
        </div>
      ) : (
        <>
          <span className="font-medium">{item.name || item.title}</span>
          <div className="flex space-x-2">
            <button
              onClick={handleEditClick}
              className="p-1.5 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Edit item"
            >
              <FaEdit />
            </button>
            {onMoveItem && (
              <>
                <button 
                  onClick={handleMoveLeft}
                  className="p-1.5 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Move item left"
                >
                  <FaArrowLeft />
                </button>
                <button 
                  onClick={handleMoveRight}
                  className="p-1.5 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Move item right"
                >
                  <FaArrowRight />
                </button>
              </>
            )}
          </div>
        </>
      )}
    </li>
  );
};

export default ListItem;