import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import  invoiceRoutes from "./routes/invoices-routes.js"
import multer from 'multer'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Multer  for file uploads
const upload = multer({ dest: 'uploads/' })

const PORT = process.env.PORT || 5173;
const MONGO_URI = process.env.MONGO_URI;

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI, 
    );

    console.log('Connected to MongoDB');

    app.use('/api/invoices', invoiceRoutes);
   

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

startServer();

