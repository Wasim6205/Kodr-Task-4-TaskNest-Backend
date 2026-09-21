
import jwt from "jsonwebtoken"
import { config } from "../config/config.js"

export const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({
            success:false,
            message:"unauthorized"
        })
    }

    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token,config.ACCESS_TOKEN_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error.message);
        
        return res.status(401).json({
            success:false,
            message:"invalid token"
        })
    }
}