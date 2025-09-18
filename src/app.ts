import express from "express"
import authRouter from "./routes/auth-routes"
import foodRouter from "./routes/food-routes"
import cookieparser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieparser())

app.use("/auth/user", authRouter)
app.use("/auth/food-partner", authRouter)
app.use("/food", foodRouter)

export default app
