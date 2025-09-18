import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodPartner"
    }
})

export default mongoose.model("foodItem", foodItemSchema)