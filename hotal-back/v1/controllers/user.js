import ApiError from '../middleware/apiError.js'
import Response from '../middleware/response.js';
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import JwtUtils from "../Utils/JwtUtils.js";


let otpStore = {};

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'candice86@ethereal.email',
        pass: 'PuM6uF8YMdAW2TSeca'
    }
});

// Function to generate OTP
const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString();
};

export const signUpUser = async (req, res, next) => {
    try {
        const { userName, email, password, userType, mobile } = req.body;
        const emailCheck = await User.findOne({ email });

        if (emailCheck) {
            return res.json({ msg: "Email already exists.", status: false });
        }

        const otp = generateOtp();
        otpStore[email] = otp;

        const mailOptions = {
            from: '"Maddison Foo Koch 👻" <govind010119@gmail.com>',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error occurred while sending OTP:', error); 
                return res.status(500).send('Error sending OTP');
            }

            return res.json({ status: true, msg: "OTP sent successfully. Please verify to complete registration." });
        });

    } catch (err) {
        if (err instanceof ApiError) return Response.error(res, err);
        return Response.error(res, ApiError.internal(err));
    }
};



export const otpVerification = async (req, res) => {
    try {
        const { email, otp, userName, password, userType, mobile } = req.body;

        // Verify if the OTP matches
        if (otpStore[email] && otpStore[email] === otp) {
            delete otpStore[email]; // Remove the OTP after successful verification

            // Hash the password and create the user
            const hashPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                userName, email, mobile, userType, password: hashPassword
            });
            
            // Removing the password field before sending the response
            const { password: _, ...userWithoutPassword } = user._doc;

            return res.json({ status: true, user: userWithoutPassword, msg: "User registered successfully" });
        } else {
            return res.json({ status: false, msg: "Invalid or expired OTP" });
        }
    } catch (err) {
        if (err instanceof ApiError) return Response.error(res, err);
        return Response.error(res, ApiError.internal(err));
    }
};

export const login=async(req,res)=>{
    try{
        let {email,password}=req.body
        const fetchedUser = await User.findOne({ email });
        if (!fetchedUser) {
            return Response.error(res, ApiError.notFound("User not found"));
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, fetchedUser.password);

        if (!isMatch) {
            return Response.error(res, ApiError.unauthorized("Invalid password"));
        }
        const token = await JwtUtils.generateToken(fetchedUser._doc);
        let result={
            fetchedUser,token:token
        }
        Response.success(res,"User Found SuccessFully",result)
    }catch(err){
        if (err instanceof ApiError) return Response.error(res, err);
        return Response.error(res, ApiError.internal(err));
    }
}



// async(req,res,next)=>{
    
//     let { name,email,mobile,password }=req.body
//     // res.send('res')
//     if(!name && !!email && !mobile && !password) res.send({result:'Enter credentials'});
//     try{
//         let  fetchUser=new User.find({email:email})
//         res.send(fetchUser)
//         // let user = new User(req.body)
//     }catch(err){
//         if(err instanceof ApiError ) return Response.error(res, err);
//         return Response.error(res, ApiError.internal(err))
//     }
// }