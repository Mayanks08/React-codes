import React, { useState } from 'react';
import axios from 'axios';

const InvoiceDetails = ({ invoice }) => {
  const [category, setCategory] = useState(invoice.category);
  const categories = [
    '5010 Office Supplies',
    '5020 Software Subscriptions',
    '5030 Internet & Phone',
    '5040 Travel & Transportation',
    '5050 Meals & Entertainment',
    '5060 Professional Services',
    '5070 Marketing & Advertising',
  ];

  const handleCategoryChange = async (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    try {
      await axios.put(`http://localhost:5000/api/invoices/${invoice._id}`, { category: newCategory });
    } catch (err) {
      console.error('Error updating category:', err);
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Vendor', 'Date', 'Amount', 'Category', 'Items'],
      [invoice.vendor, invoice.date, invoice.amount, invoice.category, invoice.items.join(';')],
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoice.vendor}-invoice.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
      <p><strong>Vendor:</strong> {invoice.vendor}</p>
      <p><strong>Date:</strong> {invoice.date}</p>
      <p><strong>Amount:</strong> ${invoice.amount}</p>
      <p><strong>Items:</strong></p>
      <ul className="list-disc pl-5">
        {invoice.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div className="mt-4">
        <label className="block mb-2">Category:</label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="p-2 border rounded w-full"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <button
        onClick={handleExport}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Export as CSV
      </button>
    </div>
  );
};

export default InvoiceDetails