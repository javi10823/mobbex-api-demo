import {Router} from 'express';
import {getCategories,createCategory,getOneCategory,updateCategory,deleteCategory} from '../controllers/category.controller';
import {getOrders,createOrder,getOneOrder,updateOrder,deleteOrder} from '../controllers/order.controller';
import {getUsers,createUser,getOneUser,updateUser,deleteUser} from '../controllers/user.controller';
import {getProducts,createProduct,getOneProduct,updateProduct,deleteProduct} from '../controllers/product.controller';
import { payment } from '../controllers/payment.controller';
import { authService } from '../services/AuthService';


const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getOneProduct);
router.post('/products',createProduct);
router.put('/products/:id',updateProduct);
router.delete('/products/:id',deleteProduct);

router.get('/category', getCategories);
router.get('/category/:id', getOneCategory);
router.post('/category',createCategory);
router.put('/category/:id',updateCategory);
router.delete('/category/:id',deleteCategory);

router.get('/oders', getOrders);
router.get('/orders/:id', getOneOrder);
router.post('/orders',createOrder);
router.put('/orders/:id',updateOrder);
router.delete('/orders/:id',deleteOrder);

router.get('/users', getUsers);
router.get('/users/:id', getOneUser);
router.post('/users',createUser);
router.put('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);

router.post('/signin', authService)

router.post('/payment', payment)

export default router;