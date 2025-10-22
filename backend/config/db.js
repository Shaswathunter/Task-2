import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Use new URL parser and unified topology options
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // exit process with failure
  }
};

// Optional: listen for connection events
mongoose.connection.on('connected', () => {
  console.log('📦 Mongoose default connection open');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose connection disconnected');
});

export default connectDB;
