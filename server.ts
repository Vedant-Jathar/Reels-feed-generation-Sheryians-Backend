import app from "./src/app"
import { connectDB } from "./src/db/db"


connectDB()

app.listen(4000, () => {
    console.log("Listening on port 4000");
})