import express from 'express';
import { getUserProfile, updateUser, deleteUser } from '../controllers/user.controller.js';
import protectRoute from '../middleware/protectRoute.js';
import authorizeRole from '../middleware/authorizeRole.js';

const router = express.Router();

router.get('/profile', protectRoute, getUserProfile);
router.put('/:userId', protectRoute, authorizeRole(2), updateUser); // Only admin can update user
router.delete('/:userId', protectRoute, authorizeRole(2), deleteUser); // Only admin can delete user

export default router;
