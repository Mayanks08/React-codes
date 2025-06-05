import { useState, useEffect } from 'react';
import './App.css';
import ListsView from './components/ListsView';
import LoadingView from './components/LoadingView';
import FailureView from './components/FailureView';
import { fetchLists } from './services/apiService';

function App() {
  const [listsData, setListsData] = useState([]);
  const [apiStatus, setApiStatus] = useState('INITIAL');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getListsData();
  }, []);

  const getListsData = async () => {
    setApiStatus('LOADING');
    try {
      const data = await fetchLists();
if (Array.isArray(data)) {
  setListsData(data);
  setApiStatus('SUCCESS');
} else {
  throw new Error('Invalid data format from API');
}
    } catch (error) {
      console.error('Error fetching lists:', error);
      setErrorMsg(error.message || 'Failed to fetch lists data');
      setApiStatus('FAILURE');
    }
  };

  const renderBasedOnApiStatus = () => {
    switch (apiStatus) {
      case 'LOADING':
        return <LoadingView />;
      case 'SUCCESS':
        return <ListsView listsData={listsData} setListsData={setListsData} />;
      case 'FAILURE':
        return <FailureView errorMsg={errorMsg} retryFn={getListsData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-primary-700 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">List Creator</h1>
          <p className="mt-1 text-primary-100">Create and manage your lists with ease</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {renderBasedOnApiStatus()}
      </main>
    </div>
  );
}

export default App;