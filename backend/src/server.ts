import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import productRoutes from './routes/product.routes';

const app = express();

app.use(cors()); // Allow all origins
app.use(express.json()); // Parse JSON bodies

// Health check
app.get("/api", (req, res) => res.send("Altibbe Backend is running"));

// Main API routes
app.use('/api', productRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app; // For Vercel