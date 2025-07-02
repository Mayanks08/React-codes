# Invoicer

An end-to-end web application for uploading, processing, and managing invoice documents. This project extracts data from PDF invoices using OCR and displays/manage them via a modern React frontend.

## Features

- Upload Photos  invoices and extract data automatically
- View a list of all processed invoices
- View invoice details
- Delete invoices
- Modern UI with React, Tailwind CSS, and Vite
- Backend processing with Node.js, Express, MongoDB, Tesseract.js, and pdf2pic

## Project Structure

```
Invoicer-pro/         # Frontend (React)
  src/
    components/
      InvoiceUploader.jsx
      InvoiceList.jsx
      InvoiceDetails.jsx
    App.jsx
    ...
  public/
  ...

Sever/               # Backend (Node.js/Express)
  model/
    Invoicer-model.js
  routes/
    invoices-routes.js
  uploads/           # Uploaded invoice files
  index.js           # Server entry point
  ...
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB

### Backend Setup
1. Navigate to the `Sever` directory:
   ```sh
   cd Sever
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:5000` by default.

### Frontend Setup
1. Navigate to the `Invoicer-pro` directory:
   ```sh
   cd Invoicer-pro
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```
   The app will run on `http://localhost:5173` by default.

## Usage

1. Open the frontend in your browser.
2. Upload one or more PDF invoices using the uploader.
3. The backend will extract invoice data and display it in the invoice list.
4. Click an invoice to view details or delete it.

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Tesseract.js, pdf2pic, Multer

## Notes

- Ensure MongoDB is running before starting the backend.
- The backend saves uploaded files in the `uploads/` directory.
- You can customize invoice data extraction logic in `Sever/routes/invoices-routes.js`.

## License

MIT
