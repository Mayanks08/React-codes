import React from 'react';
import ListItem from './ListItem';

const ListContainer = ({ listNumber, items, isSelected, onSelect, onMoveItem, onUpdateItem }) => {
  const handleSelect = () => {
    onSelect(listNumber);
  };

  return (
    <div className={`list-container transition-all duration-200 ${
      isSelected ? 'ring-2 ring-primary-500' : ''
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">List {listNumber}</h3>
        {onSelect && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`list-${listNumber}`}
              checked={isSelected}
              onChange={handleSelect}
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor={`list-${listNumber}`} className="ml-2 text-sm font-medium text-gray-700">
              Select
            </label>
          </div>
        )}
      </div>
      
      <ul className="space-y-2">
        {items.length > 0 ? (
          items.map((item) => (
            <ListItem 
              key={item.id} 
              item={item} 
              onMoveItem={onMoveItem}
              onUpdateItem={onUpdateItem}
            />
          ))
        ) : (
          <li className="p-3 text-center text-gray-500">No items in this list</li>
        )}
      </ul>
    </div>
  );
};

export default ListContainer;