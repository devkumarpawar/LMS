import jwt from "jsonwebtoken";
import User from "../../models/UserModel.js";
import { compare } from "bcrypt";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email,userID) =>{
    return jwt.sign({email,userID},process.env.JWT_KEY,{expiresIn:maxAge})
}

export const signup = async (req,res,next)=>{
    try {
        const {email,password,role} = req.body;
        if(!email || !password){
            return res.status(400).send("Email and Password are required");
        }
        const user = await User.create({email,password,role});

        res.cookie("jwt",createToken(email,user._id,),{maxAge,secure:true,sameSite:"none"});
     return res.status(201).send({user:{
        id:user._id,
        email:user.email,
        role:user.role,
        profileSetup:user.profileSetup,
     }});
    } catch (error) {
     console.log(error)
     return res.status(500).send("Internal Server Error")   
    }
}


export const login = async (req,res,next)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).send("Email and Password are required");
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send("User not found");
        }

        const isPasswordValid = await compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).send("Invalid Password");
        }

        res.cookie("jwt",createToken(email,user._id,),{maxAge,secure:true,sameSite:"none"});
     return res.status(200).send({user:{
        id:user._id,
        email:user.email,
        profileSetup:user.profileSetup,
        firstName:user.firstName,
        lastName:user.lastName,
        role:user.role,
        image:user.image,
        color:user.color
     }});
    } catch (error) {
     console.log(error)
     return res.status(500).send("Internal Server Error")   
    }
}



export const getUserInfoFunction = async (req,res,next)=>{
    try {
        const userData = await User.findById(req.userId);
        if(!userData){
            return res.status(404).send("User not found");
        }
     return res.status(200).send({
        id:userData.id,
        email:userData.email,
        profileSetup:userData.profileSetup,
        firstName:userData.firstName,
        lastName:userData.lastName,
        role:userData.role,
        image:userData.image,
        color:userData.color
     });
    } catch (error) {
     console.log(error)
     return res.status(500).send("Internal Server Error")   
    }
}