import jwt from "jsonwebtoken"
import { config } from "./config.js"

export const generateTokens = (id) => {
    const accessToken = jwt.sign({id:id},config.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
    const refreshToken = jwt.sign({id:id},config.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})

    return {accessToken,refreshToken}
}