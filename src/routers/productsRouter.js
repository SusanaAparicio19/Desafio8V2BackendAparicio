import { Router } from "express";
import { getProductById, addProduct, updateProduct, deleteProduct } from '../controllers/productsRouter.controller.js';
import { getAllProductsMoking, getOneProductMoking, deleteProductMocking } from '../../controllers/mocking.controllers.js'

export const productsRouter = Router();

productsRouter.get('/:pid', getProductById);
productsRouter.post('/', addProduct);
productsRouter.put('/:pid', updateProduct);
productsRouter.delete('/:pid', deleteProduct);
productsRouter.post('/mockingproducts', getAllProductsMoking, getOneProductMoking, deleteProductMocking);
