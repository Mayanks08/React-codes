import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import axios from 'axios';

const InvoiceUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    try {
    
      const { data: { text } } = await Tesseract.recognize(file, 'eng');
      
     
      const extractedData = parseInvoiceText(text);
      
      
      await axios.post('http://localhost:5000/api/invoices', {
        ...extractedData,
        fileName: file.name,
      });

      onUploadSuccess();
      setFile(null);
    } catch (err) {
      setError('Error processing invoice');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const parseInvoiceText = (text) => {
   
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    let vendor = '';
    let date = '';
    let amount = 0;
    const items = [];

  
    for (const line of lines) {
      if (!vendor && (line.includes('Amazon') || line.includes('Bistro') || line.match(/[A-Z\s]+/))) {
        vendor = line.match(/[A-Z\s]+/)?.[0].trim() || 'Unknown';
      }
      if (line.match(/\d{1,2}\/\d{1,2}\/\d{2,4}/)) {
        date = line.match(/\d{1,2}\/\d{1,2}\/\d{2,4}/)?.[0] || '';
      }
      if (line.match(/(?:Total|Amount)\s*[:\s]*\$[\d.]+/i)) {
        amount = parseFloat(line.match(/\$([\d.]+)/)?.[1] || 0);
        }
        if (line.trim() && !line.includes('Total') && !line.match(/Date|Vendor/)) {
        items.push(line);
        }
    }

    
    const category = suggestCategory(vendor);

    return { vendor, date, amount, items, category };
  };

  const suggestCategory = (vendor) => {
    const rules = {
      'Amazon': '5010 Office Supplies',
      'Bistro': '5050 Meals & Entertainment',
      'Uber': '5040 Travel & Transportation',
    };
    return rules[vendor] || 'Uncategorized';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Upload Invoice</h2>
      <input
        type="file"
        accept=".pdf,.jpg,.png"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded w-full"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {uploading ? 'Processing...' : 'Upload'}
      </button>
    </div>
  );
};

export default InvoiceUploader;

