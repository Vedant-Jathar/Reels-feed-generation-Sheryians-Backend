import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { configDotenv } from "dotenv";
import foodPartnerModel from "../models/food-partner-model";
import { ExtendedRequest } from "../types/auth-types";

configDotenv()

export const authFoodPartnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies
        if (!token) {
            res.status(401).json({ message: "Unauthorized user" })
            return
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        const foodPartner = await foodPartnerModel.findById((decoded as JwtPayload)?.id)
        if (!foodPartner) {
            res.status(403).json({ message: "Forbidden error" })
            return
        }

        (req as ExtendedRequest).food_partner = foodPartner
        
        next()
    } catch (error) {
        res.status(500).json("Internl server error: Error in auth middleware")
    }
}