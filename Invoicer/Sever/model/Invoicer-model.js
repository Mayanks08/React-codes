import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  vendor: String,
  date: String,
  amount: Number,
  items: [String],
  category: String,
  fileName: String,
  createdAt: { type: Date, default: Date.now },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;