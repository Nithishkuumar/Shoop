const jwt = require("jsonwebtoken")
const AppError = require("./appError")

module.exports = (res,userId)=>{
    const token = jwt.sign({userId},process.env.SECRET,{
    expiresIn:"30d"
})

if(!token){
    return next( new AppError("Invalid email or password",401))
}

res.cookie("jwt",token,{
    httpOnly:true,
    secure:process.env.NODE_ENV!=="development",
    sameSite:"strict",
    maxAge:30*24*60*60*1000
})}

//  export default generateToken;