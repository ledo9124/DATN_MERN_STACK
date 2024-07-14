import User from '../models/user.model.js';

export const getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select('-password');
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export const updateUser = async (req, res) => {
	const { userId } = req.params;
	const { username, email, fullName, phoneNumber, avatar, role } = req.body;

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

	try {
		if (email && !validateEmail(email)) {
			return res.status(400).json({ error: 'Invalid email format' });
		}
		if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
			return res.status(400).json({ error: 'Invalid phone number format' });
		}
		if (fullName && !validateFullName(fullName)) {
			return res.status(400).json({ error: 'Invalid full name format' });
		}

		const user = await User.findByIdAndUpdate(userId, { username, email, fullName, phoneNumber, avatar, role }, { new: true }).select('-password');
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export const deleteUser = async (req, res) => {
	const { userId } = req.params;
	try {
		const user = await User.findByIdAndDelete(userId).select('-password');
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.json({ message: 'User deleted successfully' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
