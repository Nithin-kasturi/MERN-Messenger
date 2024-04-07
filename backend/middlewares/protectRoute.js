import mongoose from "mongoose";
import jwt, { decode } from 'jsonwebtoken';
import User from "../models/user.model.js";
const protectRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token){
            res.status(401).json({error:"Unauthorized not token provided"});
        }
        const decoded=jwt.verify(token,process.env.JWT_KEY);
        if(!decoded){
            return res.status(401).json({error:"Unauthorized Invalid token"});
        }
        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        req.user=user;
        next();
    }
    catch(err){
        console.log("Error at protectRoute",err);
        res.status(500).json({error:"Internal server error"});
    }
}
export default protectRoute;