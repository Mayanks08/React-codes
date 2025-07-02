
import express from 'express';
import multer from 'multer';
import { fromPath } from 'pdf2pic';
import Tesseract from 'tesseract.js';
import mongoose from 'mongoose';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, default: 'Unknown' },
  date: { type: String, default: 'Unknown' },
  total: { type: String, default: '0.00' },
  account: { type: String, default: 'General' },
  vendor: { type: String, default: 'Unknown' },
  amount: { type: String, default: '0.00' },
  items: { type: [String], default: [] },
  category: { type: String, default: 'Uncategorized' },
  fileName: { type: String, default: '' },
});
const Invoice = mongoose.model('Invoice', InvoiceSchema);


router.post('/', async (req, res) => {
  try {
    const { vendor, date, amount, items, category, fileName } = req.body;
    console.log('Received invoice data:', req.body); 
    const invoice = new Invoice({
      vendor,
      date,
      amount: amount.toString(),
      items,
      category,
      fileName,
      invoiceNumber: fileName.split('.')[0], 
      total: amount.toString(),
    });
    await invoice.save();
    console.log('Saved invoice:', invoice); 
    res.status(201).json(invoice);
  } catch (error) {
    console.error('Error saving invoice:', error);
    res.status(500).json({ error: 'Error saving invoice' });
  }
});

router.post('/process', upload.array('invoices'), async (req, res) => {
  try {
    const invoices = [];
    for (const file of req.files) {
      let text = '';
      if (file.mimetype === 'application/pdf') {
        const output = fromPath(file.path, {
          density: 100,
          format: 'png',
          width: 600,
          height: 600,
        });
        const images = await output.bulk(-1);
        for (const image of images) {
          const { data } = await Tesseract.recognize(image.path, 'eng');
          text += data.text;
        }
      } else {
        const { data } = await Tesseract.recognize(file.path, 'eng');
        text = data.text;
      }

      const invoiceNumber = text.match(/Invoice\s*Number[:\s]*(\w+)/i)?.[1] || 'Unknown';
      const date = text.match(/Date[:\s]*(\d{1,2}[-/]\d{1,2}[-/]\d{4})/i)?.[1] || 'Unknown';
      const total = text.match(/Total[:\s]*\$?(\d+\.\d{2})/i)?.[1] || '0.00';
      const vendor = text.match(/Vendor[:\s]*(.+)/i)?.[1]?.split('\n')[0] || 'Unknown';
      const amount = total;
      const account = 'General';

      const invoice = new Invoice({ invoiceNumber, date, total, account, vendor, amount });
      await invoice.save();
      invoices.push({ invoiceNumber, date, total, account, vendor, amount, _id: invoice._id });
    }
    res.json(invoices);
  } catch (error) {
    console.error('Error processing invoices:', error);
    res.status(500).json({ error: 'Error processing invoices' });
  }
});


router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    console.log('Fetched invoices from DB:', invoices); 
    res.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Error fetching invoices' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const invoiceId = req.params.id;
    console.log('Attempting to delete invoice with ID:', invoiceId); 
    const invoice = await Invoice.findByIdAndDelete(invoiceId);
    if (!invoice) {
      console.log('Invoice not found for ID:', invoiceId);
      return res.status(404).json({ error: 'Invoice not found' });
    }
    console.log('Deleted invoice:', invoice);
    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ error: 'Error deleting invoice' });
  }
});

export default router;


