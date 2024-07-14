import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const validateEmail = (email) => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(String(email).toLowerCase());
};

const validatePhoneNumber = (phoneNumber) => {
	const re = /^\+?\d{10,15}$/;
	return re.test(phoneNumber);
};

const validateFullName = (fullName) => {
	const re = /^[a-zA-Z\s]+$/;
	return re.test(fullName);
};

export const register = async (req, res) => {
	const { username, email, password, fullName, phoneNumber, avatar, role } = req.body;
	try {
		if (!validateEmail(email)) {
			return res.status(400).json({ error: 'Invalid email format' });
		}
		if (!validatePhoneNumber(phoneNumber)) {
			return res.status(400).json({ error: 'Invalid phone number format' });
		}
		if (!validateFullName(fullName)) {
			return res.status(400).json({ error: 'Invalid full name format' });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ username, email, password: hashedPassword, fullName, phoneNumber, avatar, role });
		await newUser.save();
		res.status(201).json({ message: 'User registered successfully' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ error: 'Invalid credentials' });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ error: 'Invalid credentials' });
		}
		const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
		res.json({ token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
