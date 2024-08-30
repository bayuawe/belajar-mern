import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"], // this is an array that contains true,
    },
    email: {
        type: String,
        required: [true, "Email is required"], // this is an array that contains true,
    },
    password: {
        type: String,
        required: [true, "Password is required"], // this is an array that contains true,
    },
});

const User = mongoose.model("User", userSchema);

export default user