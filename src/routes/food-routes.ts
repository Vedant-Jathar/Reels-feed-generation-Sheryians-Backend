import { Router } from "express";
import { authFoodPartnerMiddleware } from "../middleware/auth-middleware";
import { createFoodItem, getFoodItems } from "../controllers/food.controllers";
import multer from "multer"

const upload = multer({
    storage: multer.memoryStorage()
})

const router = Router()

router.post("/create-food-item", upload.single("video"), authFoodPartnerMiddleware, createFoodItem)

router.get("/get-food-items", getFoodItems)

export default router