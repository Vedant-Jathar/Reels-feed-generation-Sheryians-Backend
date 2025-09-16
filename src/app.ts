import express from "express"
import authRouter from "./routes/auth-routes"
import cookieparser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieparser())

app.use("/auth", authRouter)

export default app
