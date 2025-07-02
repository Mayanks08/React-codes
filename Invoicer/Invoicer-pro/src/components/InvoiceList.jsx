import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceList = ({ onSelectInvoice,refreshTrigger }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const fetchInvoices = async () => {
     setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/invoices');
     
      console.log('Fetched invoices:', response.data);
      setInvoices(response.data);
     
    } catch (err) {
      console.error('Error fetching invoices:', err); 
    }
     setLoading(false);
  };
    useEffect(() => {
    fetchInvoices();
  }, [refreshTrigger]);

  const handleDelete = async (invoiceId) => {
   
    if (!window.confirm('Are you sure you want to delete this invoice?')) return;

    try {
      console.log('Deleting invoice with ID:', invoiceId); // 
      setLoading(true);
      const response = await axios.delete(`http://localhost:5000/api/invoices/${invoiceId}`);
      console.log('Delete response:', response.data);
      setInvoices(invoices.filter((invoice) => invoice._id !== invoiceId));
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error deleting invoice:', err);
      const errorMessage = err.response?.status === 404 
        ? 'Invoice not found. It may have been already deleted.'
        : 'Failed to delete invoice. Please try again.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Processed Invoices</h2>
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {invoices.length === 0 && !loading && (
          <p className="text-gray-500">No invoices found.</p>
        )}
        {invoices.map((invoice) => (
          <li
            key={invoice._id}
            className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer border-b"
          >
            <div
              onClick={() => onSelectInvoice(invoice)}
              className="flex-grow"
            >
              {invoice.vendor || 'Unknown'} - ${invoice.amount || '0.00'} ({invoice.date || 'Unknown'})
            </div>
            <button
              onClick={() => handleDelete(invoice._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              disabled={loading}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;


