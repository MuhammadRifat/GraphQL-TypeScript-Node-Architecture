import mongoose, { model } from "mongoose";
import { ICounter } from "./common.interface";

// counter schema
const counterSchema = new mongoose.Schema<ICounter>({
    uniqueId: {
        type: String,
        required: true,
        unique: true,
    },
    seq_value: {
        type: Number,
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

const Counter = model("Counter", counterSchema);

export { Counter };