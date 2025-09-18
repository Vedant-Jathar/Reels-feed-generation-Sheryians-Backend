import { Request } from "express";
import mongoose from "mongoose";

export interface User {
    _id: string,
    name: string,
    email: string,
    password: string
}

export interface FoodPartner {
    _id: mongoose.Types.ObjectId
    name: string
    email: string
    password: string
}

export interface ExtendedRequest extends Request {
    food_partner: FoodPartner
}

