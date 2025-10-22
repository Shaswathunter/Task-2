import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Manager', 'Store Keeper'], default: 'Store Keeper' }
});

export default mongoose.model('User', userSchema);
