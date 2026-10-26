import mongoose from 'mongoose';

mongoose.set('bufferCommands', false);

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('[AI Studio] MONGODB_URI not set — using in-memory user store');
    return false;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    console.log('MongoDB connected');
    return true;
  } catch (err) {
    console.warn('MongoDB not connected — using in-memory user store:', err.message);
    return false;
  }
}
