import { Request, Response, NextFunction } from "express";
import userModel from "../models/user-model";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../types/auth-types";
import foodPartnerModel from "../models/food-partner-model";

export async function registerUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password } = req.body
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            res.status(400).json({ message: `User ${email} already exists` })
            return
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const newUser = await userModel.create({ name, email, password: hashedPassword })

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, { expiresIn: "24h" })

        res.cookie("token", token, { httpOnly: true, sameSite: true, secure: true, domain: "localhost" })

        res.json(`User created successfully => id:${newUser._id}`)
    } catch (error) {
        console.log("error", error);

        res.status(400).json({ message: "Error registering user", err: error })
    }
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body

        const existingUser: User | null = await userModel.findOne({ email })
        console.log("existingUser:", existingUser);

        if (!existingUser) {
            res.status(400).json({ message: "Invalid credentials" })
            return
        }

        const hasPasswordMatched = await bcryptjs.compare(password, existingUser.password)

        if (!hasPasswordMatched) {
            res.status(400).json({ message: "Invalid credentials" })
            return
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET as string)

        res.cookie("token", token, { domain: "localhost", sameSite: true, secure: true, httpOnly: true })

        res.json({ message: "Logged in successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error logging in" })
    }
}

export async function logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.cookies

        if (!token) {
            res.json({ message: "You are logged out already" })
        }

        res.clearCookie("token", { httpOnly: true, sameSite: true, secure: true, domain: "localhost" })

        res.json({ message: "You have logged out successfuly" })
    } catch (error) {
        res.json({ message: "Error in logging out" })
    }
}

export async function registerFoodPartner(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password } = req.body

        const existingFoodPartner = await foodPartnerModel.findOne({ email })

        if (existingFoodPartner) {
            res.status(400).json({ message: "User exists already" })
            return
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const newFoodPartner = await foodPartnerModel.create({ name, email, password: hashedPassword })

        const token = jwt.sign({ id: newFoodPartner._id }, process.env.JWT_SECRET as string, {
            expiresIn: "24h"
        })

        res.cookie("token", token, { domain: 'localhost', sameSite: true, secure: true, httpOnly: true })

        res.json({ message: "Food partner registered successfully" })

    } catch (error) {
        res.json({ message: "Error registering food partner" })
    }
}

export async function loginFoodPartner(req: Request, res: Response, next: NextFunction) {

    try {
        const { email, password } = req.body

        const existingFoodPartner = await foodPartnerModel.findOne({ email })

        if (!existingFoodPartner) {
            res.status(400).json("Invalid credentials")
            return
        }

        const hasPasswordMatched = await bcryptjs.compare(password, existingFoodPartner?.password as string)

        if (!hasPasswordMatched) {
            res.status(400).json({ message: "Invalid credentials" })
            return
        }

        const token = jwt.sign({ id: existingFoodPartner._id }, process.env.JWT_SECRET as string, { expiresIn: "24h" })

        res.cookie("token", token)

        res.json({ message: "Logged in successfully" })

    } catch (error) {
        res.status(500).json("Error logging in food partner")
    }
}

export async function logoutFoodPartner(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.cookies
        if (!token) {
            res.json({ message: "You have already logged out" })
        }
        res.clearCookie("token")

        res.json({ message: "You have been contrsuccessfully logged out" })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}