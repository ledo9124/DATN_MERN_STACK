import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const protectRoute = (req, res, next) => {
	const token = req.header('Authorization').replace('Bearer ', '');
	if (!token) {
		return res.status(401).json({ error: 'No token provided, authorization denied' });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decoded.userId;
		req.role = decoded.role;
		next();
	} catch (error) {
		res.status(401).json({ error: 'Invalid token' });
	}
};

export default protectRoute;
