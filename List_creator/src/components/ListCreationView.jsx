import React, { useState, useEffect } from 'react';
import ListContainer from './ListContainer';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ListCreationView = ({ listsData, selectedLists, onCancel, onUpdate, onUpdateItem }) => {
  const [firstList, setFirstList] = useState([]);
  const [secondList, setSecondList] = useState([]);
  const [newList, setNewList] = useState([]);
  const [nextId, setNextId] = useState(1000);

  useEffect(() => {
    // Sort selected lists in ascending order
    const sortedLists = [...selectedLists].sort((a, b) => a - b);
    
    // Group items by their list_number
    const lists = listsData.reduce((acc, item) => {
      if (!acc[item.list_number]) {
        acc[item.list_number] = [];
      }
      acc[item.list_number].push({...item});
      return acc;
    }, {});
    
    // Set the first and second list based on the selection
    setFirstList(lists[sortedLists[0]] || []);
    setSecondList(lists[sortedLists[1]] || []);
    
    // Find the highest id to set nextId
    const maxId = listsData.reduce((max, item) => Math.max(max, item.id), 0);
    setNextId(maxId + 1);
  }, [listsData, selectedLists]);

  const handleMoveItem = (item, direction, sourceList) => {
    let sourceItems, setSourceItems, targetItems, setTargetItems;
    
    // Determine source and target lists based on direction and source
    if (sourceList === 'first') {
      sourceItems = firstList;
      setSourceItems = setFirstList;
      targetItems = newList;
      setTargetItems = setNewList;
    } else if (sourceList === 'second') {
      sourceItems = secondList;
      setSourceItems = setSecondList;
      targetItems = newList;
      setTargetItems = setNewList;
    } else if (sourceList === 'new') {
      sourceItems = newList;
      setSourceItems = setNewList;
      
      if (direction === 'left') {
        targetItems = firstList;
        setTargetItems = setFirstList;
      } else {
        targetItems = secondList;
        setTargetItems = setSecondList;
      }
    }
    
    // Remove item from source list
    const updatedSourceItems = sourceItems.filter(i => i.id !== item.id);
    setSourceItems(updatedSourceItems);
    
    // Add item to target list with appropriate list_number
    const targetListNumber = sourceList === 'first' || (sourceList === 'new' && direction === 'right') 
      ? selectedLists[1] 
      : selectedLists[0];
    
    const updatedItem = {
      ...item,
      list_number: targetListNumber
    };
    
    setTargetItems([...targetItems, updatedItem]);
  };

  const handleMoveFirstToNew = (item) => {
    handleMoveItem(item, 'right', 'first');
  };

  const handleMoveSecondToNew = (item) => {
    handleMoveItem(item, 'left', 'second');
  };

  const handleMoveNewToFirst = (item) => {
    handleMoveItem(item, 'left', 'new');
  };

  const handleMoveNewToSecond = (item) => {
    handleMoveItem(item, 'right', 'new');
  };

  const handleUpdate = () => {
    // Create a new list number (one higher than the highest existing list number)
    const newListNumber = Math.max(...listsData.map(item => item.list_number)) + 1;
    
    // Update the list_number for items in the new list
    const updatedNewList = newList.map(item => ({
      ...item,
      list_number: newListNumber,
      id: nextId + newList.indexOf(item) // Assign new unique IDs
    }));
    
    // Combine all lists
    const updatedLists = [
      ...listsData.filter(item => !selectedLists.includes(item.list_number)),
      ...firstList,
      ...secondList,
      ...updatedNewList
    ];
    
    onUpdate(updatedLists);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Create New List</h2>
        <p className="text-gray-600 mb-4">
          Move items between lists using the arrow buttons. The new list will be created in the middle.
        </p>
        <div className="flex space-x-4">
          <button 
            onClick={onCancel}
            className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button 
            onClick={handleUpdate}
            className="btn btn-primary"
          >
            Update
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* First selected list */}
        <div>
          <ListContainer 
            listNumber={selectedLists[0]}
            items={firstList}
            onMoveItem={(item) => handleMoveFirstToNew(item)}
            onUpdateItem={onUpdateItem}
          />
        </div>
        
        {/* New list (in the middle) */}
        <div className="border-2 border-dashed border-primary-300 p-4 rounded-lg bg-primary-50">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-primary-700">New List</h3>
            <p className="text-sm text-gray-600">Items moved here will form a new list</p>
          </div>
          <ul className="space-y-2">
            {newList.length > 0 ? (
              newList.map((item) => (
                <ListItem 
                  key={item.id} 
                  item={item}
                  onMoveItem={(item) => {
                    const direction = Math.random() < 0.5 ? 'left' : 'right';
                    handleMoveItem(item, direction, 'new');
                  }}
                  onUpdateItem={onUpdateItem}
                />
              ))
            ) : (
              <li className="p-3 text-center text-gray-500">
                Move items here from the adjacent lists
              </li>
            )}
          </ul>
        </div>
        
        {/* Second selected list */}
        <div>
          <ListContainer 
            listNumber={selectedLists[1]}
            items={secondList}
            onMoveItem={(item) => handleMoveSecondToNew(item)}
            onUpdateItem={onUpdateItem}
          />
        </div>
      </div>
    </div>
  );
};

export default ListCreationView;