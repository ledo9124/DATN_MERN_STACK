import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	fullName: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	avatar: { type: String },
	role: { type: Number, enum: [0, 1, 2], default: 0 },
	createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User;
