import { NextFunction, Request, Response } from "express";
import { ExtendedRequest } from "../types/auth-types";
import uploadFile from "../utils/cloudinary";
import foodItemModel from "../models/food-item-model";

export const createFoodItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description } = req.body
        const result = await uploadFile(req.file?.buffer as Buffer)

        const newFoodItem = await foodItemModel.create({
            name,
            description,
            video: result.url,
            foodPartner: (req as ExtendedRequest).food_partner._id
        })
        res.json({ message: "Food Item created", foodItem: newFoodItem })
        return
    } catch (error) {
        res.status(500).json("Internal server error")
    }
}

export const getFoodItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allFoodItems = await foodItemModel.find()
        res.json({ foodItems: allFoodItems })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}