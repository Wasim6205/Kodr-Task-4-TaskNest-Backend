import { generateTokens } from "../config/auth.js"
import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signupUser = async (req,res) => {
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const userExist = await userModel.findOne({email})
        if(userExist){
            return res.status(400).json({
                success:false,
                message:"user already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await userModel.create({
            name,
            email,
            password:hashedPassword
        })

        const {accessToken,refreshToken} = generateTokens(user._id)

        user.refreshToken = refreshToken
        await user.save()

        res.cookie("refreshToken",refreshToken)

        return res.status(201).json({
            success:true,
            message:"user registered successfully",
            data:{
                name:user.name,
                email:user.email
            },
            accessToken
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}

export const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }

        const comparePassword = await bcrypt.compare(password,user.password)
        if(!comparePassword){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }

        const {accessToken,refreshToken} = generateTokens(user._id)

        user.refreshToken = refreshToken
        await user.save()

        res.cookie("refreshToken",refreshToken)

        return res.status(200).json({
            success:true,
            message:"user loggedin successfully",
            data:{
                name:user.name,
                email:user.email
            },
            accessToken
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}