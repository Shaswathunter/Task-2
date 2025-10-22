// backend/createDemoUsers.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './modals/User.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const createUsers = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('123456', salt);

  const users = [
    { name: 'Manager User', email: 'manager@a.com', password: hashedPassword, role: 'Manager' },
    { name: 'Store Keeper User', email: 'store@example.com', password: hashedPassword, role: 'Store Keeper' },
  ];

  await User.insertMany(users);
  console.log('Demo users created');
  process.exit();
};

createUsers();
