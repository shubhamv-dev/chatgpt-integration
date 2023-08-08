




const  JWT =require('jsonwebtoken');
const userModel = require('../models/userModel');


exports.requireSignin =async(req,res,next)=>{

try {
    const decode =JWT.verify(req.headers.authorization,process.env.JWT_SECRETE)
    req.user=decode;
    next()
} catch (error) {
   console.log(error); 
}
}

exports.isAdmin = async(req,res,next)=>{
try {
    const user =await userModel.findById(req.user._id)
    console.log("userrrrrr",user);
   if(user.role !==1){
  return res.status(401).send({success:false,message:'Unauthorized Access'})
}else{
   
next();
}
    
} catch (error) {
   console.log(error) 
   res.status(401).send({success:false,message:'error in admin middleware'})
}
}