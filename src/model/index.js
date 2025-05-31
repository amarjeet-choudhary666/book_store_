import mongoose, { Schema } from "mongoose"

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minlength: [2, "Title must be at least 2 characters"],
            maxlength: [100, "Title cannot exceed 100 characters"]
        },
        author: {
            type: String,
            required: true,
            trim: true,
            minlength: [2, "Author name must be at least 2 characters"],
            maxlength: [50, "Author name cannot exceed 50 characters"]
        },
        price: {
            type: Number,
            required: true,
            min: [0, "Price cannot be negative"],
            max: [10000, "Price cannot exceed 10000"]
        },
        publishData: {
            type: Date,
            required: [true, "publish date is required"],
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)

export const Book = mongoose.model("Book", bookSchema)