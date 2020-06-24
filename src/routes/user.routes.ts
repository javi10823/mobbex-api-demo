import {Router} from 'express';
import {getUsers,createUser,getOneUser,updateUser,deleteUser} from '../controllers/user.controller';
import { authService } from '../services/AuthService';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getOneUser);
router.post('/users',createUser);
router.put('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);

router.post('/signin', authService)

export default router;