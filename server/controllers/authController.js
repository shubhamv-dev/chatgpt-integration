const Authhelp = require("../helper/authHelper")
const userModel = require("../models/userModel")
const JWT = require('jsonwebtoken')

exports.registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body
        console.log(req.body);

        const existinguser = await userModel.findOne({ email })
        console.log("existinguser", existinguser);
        if (existinguser) {
            return res.status(200).send({ success: true, message: 'Already Register Please Login' })
        }
        else {
            const hashedPassword = await Authhelp.hashPassword(password)
            const user = await new userModel({ name, email, password: hashedPassword }).save()
            console.log("user", user);
            res.status(201).send({ success: true, message: 'User register sucessfully', user: user })
        }
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error in Registration ', error })
    }

}

exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body);
        if (!email || !password) {
            res.status(404).send({ success: false, message: 'Invalid Credentials' })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({ success: false, message: 'Email is not Registered' })
        }
        const match = await Authhelp.comparePassword(password, user.password)
        if (!match) {
            return res.status(201).send({ success: false, message: 'Invalid password' })
        }
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRETE, { expiresIn: "7d" })
        res.status(200).send({
            success: true,
            message: 'User Login Successfully',
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                _id: user._id
            },
            token
        })

    } catch (error) {
        res.status(500).send({ success: false, message: 'User Not valid', error })
    }

}

// forgot password controller

exports.forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newpassword } = req.body
        console.log("   console.log(req.body);", req.body);
        if (!email) {
            return res.status(400).send({ message: 'Email is required' })
        }
        if (!answer) {
            return res.status(400).send({ message: 'Answer is required' })
        }
        if (!newpassword) {
            return res.status(400).send({ message: 'NewPassword is required' })
        }
        //  check
        const user = await userModel.findOne({ email, answer })
        console.log("user", user);
        // validation
        if (!user) {
            return res.status(404).send({ success: false, message: 'Wrong Email Or Answer' })
        }
        const hashed = await hashPassword(newpassword);
        console.log("hashed", hashed);
        const haseduser = await userModel.findByIdAndUpdate(user._id, { password: hashed })
        console.log("haseduser", haseduser);
        res.status(200).send({ success: true, message: 'Password reset Successfully' })
    } catch (error) {
        return res.status(500).send({
            success: false, message: 'Somthing went Wrong', error
        })
    }
}

exports.testController = async (req, res) => {
    console.log("test controiller");
}



exports.getUser = async (req, res) => {

    try {
        const { _id } = req.params;
        const user = await userModel.findById({ _id: _id });


        if (!user) {
            return res.json({
                statuscode: "404",
                message: "User Not Found"
            });
        }

        const currentDate = new Date();
        const expiredDate = new Date(user.subscription.expired_at);

        if (expiredDate < currentDate) {
            console.log("helllllllo")
            user.subscription.planStatus = "false";
            await user.save();
        }

        res.json({
            statuscode: "200",
            message: "Success",
            data: user
        });
    } catch (error) {
        res.json({
            statuscode: "500",
            message: "Internal Server Error",
            error: error.message
        });
    }
}

