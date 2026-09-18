import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

async function start() {
  await connectDB(MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
