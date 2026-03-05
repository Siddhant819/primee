import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/database.js';

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@primehospital.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const admin = new User({
            name: 'Super Admin',
            email: adminEmail,
            password: '123456', // Seeding default password
            role: 'admin'
        });

        await admin.save();
        console.log('✅ Admin user created successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
