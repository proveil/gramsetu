import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = async (req,res,next)=>{
    const token = req.cookies.token;

    if(!token)
        return res.status(401).json({
            success: false,
            message: "Unauthorized: No token"
        });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        // if(!user.isVerified) return res.status(401).json({success: false, message: "Account not verfied"})

        if(!user)
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not found"
            });

        req.id = decoded.id;

        next();

    } catch (error) {

        if(error.name === "TokenExpiredError")
            return res.status(401).json({
                success: false,
                message: "Token expired"
            });

        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
}