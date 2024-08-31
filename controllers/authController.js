import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler.js" // Pastikan menambahkan .js jika menggunakan ES Modules

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '6d'
    });
};

const createSendResToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const isDevelopment = process.env.NODE_ENV === "development" ? false : true;

    const cookiesOptions = {
        expire: new Date(
            Date.now() + 6 * 24 * 60 * 60 * 1000
        ),
        httpOnly : true,
        secure : isDevelopment
    }

    res.cookie("jwt", token, cookiesOptions);

    user.password = undefined;
    
    res.status(statusCode).json({
        success: true,
        token,
        data: {
            user,
        },
    });
}

export const registerUser = asyncHandler(async (req, res, next) => {
    const isAdmin = (await User.countDocuments()) === 0;
    const role = isAdmin ? "admin" : "user";
    const createUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: role
    });

    createSendResToken(createUser, 200, res);
});
