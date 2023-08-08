const express = require('express');
const router =express.Router()
const Auth = require('../controllers/authController')
const AuthMiddle =require ('../middleware/authMiddleware');
const { stripeProductCreate } = require('../controllers/stripeController');


// routing
// register || method post

router.post('/register',Auth.registerController)
router.post('/login',Auth.loginController)
router.get('/test',AuthMiddle.requireSignin,AuthMiddle.isAdmin,Auth.testController)

// forgot-password ||POST

router.post('/forgot-password',Auth.forgotPasswordController)


// protected route
router.get('/user-auth',AuthMiddle.requireSignin,(req,res)=>{
           return res.status(200).send({ok:true})
        })
// admin auth
router.get('/admin-auth',AuthMiddle.requireSignin,AuthMiddle.isAdmin,(req,res)=>{
 return res.status(200).send({ok:true})
})
router.post("/clickpay",stripeProductCreate);
router.get("/getuser/:_id",Auth.getUser);
module.exports = router;