import User from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import generateToken from "../utils/generateToken.js";
export const loginUser=async(req,res)=>{
    try{
        const {userName,password}=req.body;
        const user=await User.findOne({userName});
        const doesPasswordsMatch=await bcrypt.compare(password,user?.password || "");
        if(!user || !doesPasswordsMatch){
            return res.status(400).json({error:"Invalid Username or password"});
        }
        generateToken(user._id,res);
        res.status(200).json({
            _id: user._id,
            fullName:user.fullName,
            userName:user.userName,
            profilePic:user.profilePic
        })
    }
    catch(err){
        console.log("Error at login",err);
        res.status(500).json({error:"Internal server error"});
    }
    
}
export const logoutUser=(req,res)=>{
    try{
        res.cookie("JWT TOKEN","",{maxAge:0});
        res.status(200).json({message:"LOgged out successfully"});        
    }
    catch(err){
        console.log("Error at logout",err);
        res.status(500).json({error:"Internal server error"});
    }
}
export const signupUser=async(req,res)=>{
    try{
        const {fullName,userName,password,confirmPassword,gender}=req.body;
        if(password!==confirmPassword){
            return res.status(400).json({error:"Password donot match"});
        }
        const user=await User.findOne({userName});
        if(user){
            return res.send(400).json({error:"UserName already Exists"});
        }
        //Hash password

        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        const boyUser=`https://avatar.iran.liara.run/public/boy?username=[${userName}]`;
        const girlUser=`https://avatar.iran.liara.run/public/girl?username=[${userName}]`;
        const newUser=await new User({
            fullName,
            userName,
            password:hashPassword,
            gender,
            profilePic:gender==="male"?boyUser:girlUser,
        })
        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            userName:newUser.userName,
            profilePic:newUser.profilePic
        })
        }
        else{
            res.status(400).json({error:"Invalid User data"});
        }
        

    }
    catch(err){
        console.log("error at signup",err);
        res.status(500).json({error:"Internal server error"});
    }
}