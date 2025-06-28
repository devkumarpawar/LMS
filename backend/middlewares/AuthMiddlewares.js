import jwt from 'jsonwebtoken';

export const verifyToken = (req, res,next) =>{
   
    const token = req.cookies.jwt;
    console.log(req)
    if(!token){
        return res.status(401).send("Unauthorized");
    }
    jwt.verify(token,process.env.JWT_KEY,async(error,payload)=>{
        
        if(error){
            return res.status(403).send("Token is not Valid!!");
        }
        req.userId = payload.userID;
        next();

    })
}