import { Router } from "express";
import { create, deleteProductById, get4All, getAll, getProductById, related, updateProductById } from '../controllers/product';

const router = Router();

router.get(`/products`, getAll);
router.get(`/get4products`, get4All);
router.get(`/products/:id`, getProductById);
router.get("/products/:categoryId/related/:productId", related);
router.post(`/products`, create);
router.put(`/products/:id`, updateProductById);
router.delete(`/products/:id`, deleteProductById);

export default router;