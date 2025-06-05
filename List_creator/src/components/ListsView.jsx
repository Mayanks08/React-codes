import  { useState } from 'react';
import ListContainer from './ListContainer';
import ListCreationView from './ListCreationView';

const ListsView = ({ listsData, setListsData }) => {
  const [selectedLists, setSelectedLists] = useState([]);
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleListSelect = (listNumber) => {
    setSelectedLists(prev => {
      if (prev.includes(listNumber)) {
        return prev.filter(num => num !== listNumber);
      } else {
        return [...prev, listNumber];
      }
    });
    setErrorMessage('');
  };

  const handleCreateNewList = () => {
    if (selectedLists.length !== 2) {
      setErrorMessage('You should select exactly 2 lists to create a new list');
      return;
    }
    setIsCreatingList(true);
  };

  const handleCancelCreate = () => {
    setIsCreatingList(false);
  };

  const handleUpdateLists = (updatedLists) => {
    setListsData(updatedLists);
    setIsCreatingList(false);
    setSelectedLists([]);
  };

  const handleUpdateItem = (updatedItem) => {
    const newListsData = listsData.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    );
    setListsData(newListsData);
  };

  // Group lists by list_number
  const groupedLists = (listsData || []).reduce((acc, item) => {
    const { list_number } = item;
    if (!acc[list_number]) {
      acc[list_number] = [];
    }
    acc[list_number].push(item);
    return acc;
  }, {});

  return (
    <div className="animate-fade-in">
      {isCreatingList ? (
        <ListCreationView 
          listsData={listsData}
          selectedLists={selectedLists}
          onCancel={handleCancelCreate}
          onUpdate={handleUpdateLists}
          onUpdateItem={handleUpdateItem}
        />
      ) : (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">All Lists</h2>
            <p className="text-gray-600 mb-2">
              Select two lists to create a new combined list.
            </p>
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 animate-fade-in">
                {errorMessage}
              </div>
            )}
            <button 
              onClick={handleCreateNewList}
              className="btn btn-primary"
            >
              Create a new list
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedLists).map(([listNumber, items]) => (
              <ListContainer 
                key={listNumber}
                listNumber={Number(listNumber)}
                items={items}
                isSelected={selectedLists.includes(Number(listNumber))}
                onSelect={handleListSelect}
                onUpdateItem={handleUpdateItem}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListsView;