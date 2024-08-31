import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"], // this is an array that contains true,
        unique: [true, "Name Already taken"],
    },
    email: {
        type: String,
        required: [true, "Email is required"], // this is an array that contains true,
        unique: [true, "Email Already taken"],
        validator: validator.isEmail,
        message: "Please provide a valid email",
    },
    password: {
        type: String,
        required: [true, "Password is required"], // this is an array that contains true,
        minLength: [6, "Password must be at least 6 characters"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

const User = mongoose.model("User", userSchema);

export default User;