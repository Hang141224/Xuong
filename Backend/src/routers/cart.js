import { Router } from "express";
import { addItemToCart, decreaseProductQuanlity, getCartByUserId, increaseProductQuanlity, removeFromCart, updateProductQuanlity, } from "../controllers/cart";


const router = Router();

router.get("/cart/:userId", getCartByUserId);
router.post("/cart/add-to-cart", addItemToCart);
router.put("/cart/update-cart", updateProductQuanlity);
router.post("/cart/remove-form-cart", removeFromCart);
router.post("/cart/increase", increaseProductQuanlity);
router.post("/cart/decrease", decreaseProductQuanlity);

export default router;