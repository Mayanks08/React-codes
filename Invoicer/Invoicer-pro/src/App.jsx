import InvoiceUploader from './components/InvoiceUploader.jsx';
import InvoiceList from './components/InvoiceList.jsx';
import InvoiceDetails from './components/InvoiceDetails.jsx';
import { useState } from 'react';

const App = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [refreshInvoices, setRefreshInvoices] = useState(0);

  const handleUploadSuccess = () => {
    setSelectedInvoice(null);
    setRefreshInvoices(prev => prev + 1); 
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Invoice Processor</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <InvoiceUploader onUploadSuccess={handleUploadSuccess} />
          <InvoiceList onSelectInvoice={setSelectedInvoice} refreshTrigger={refreshInvoices} />
        </div>
        {selectedInvoice && <InvoiceDetails invoice={selectedInvoice} />}
      </div>
    </div>
  );
};

export default App;