import Router from "express"
import { loginUser, logoutUser, registerUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner } from "../controllers/auth.controller"

const router = Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)

router.post("/register-food-partner", registerFoodPartner)
router.post("/login-food-partner", loginFoodPartner)
router.post("/logout-food-partner", logoutFoodPartner)

export default router