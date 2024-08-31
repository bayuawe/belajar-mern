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
    console.log("Request Body:", req.body); // Tambahkan ini untuk melihat data yang diterima
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

export const loginUser = asyncHandler(async (req, res) => {
    // Tahap 1 Validasi
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            throws: {
                success: false,
                message: "Please provide email and password"
            }
        });
    }

    // Tahap 2 Cari User
    const userData = await User.findOne({
        email: req.body.email 
    }).select("+password");

    // Tahap 3 Validasi password
    if (userData && await userData.matchPassword(req.body.password)) {
        createSendResToken(userData, 200, res);
    } else {
        return res.status(401).json({
            throws: {
                success: false,
                message: "Invalid credentials"
            }
        });
    }
});