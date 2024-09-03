import mongoose from "mongoose";

const { Schema } = mongoose;

const singleProduct = Schema(
    {
        name: {
            type: String,
            required: true 
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required: true,
        },
        
    }
)

const orderSchema = new Schema({
    total: {
        type: Number,
        required: [true, "Total is required"], // this is an array that contains true,
    },
    itemDetail: [singleProduct],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Failed", "Success"],
        default: "Pending",
    },
    firstName: {
        type: String,
        required: [true, "First name is required"], // this is an array that contains true,
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"], // this is an array that contains true,
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"], // this is an array that contains true,
    },
    email: {
        type: String,
        required: [true, "Email is required"], // this is an array that contains true,
    },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
