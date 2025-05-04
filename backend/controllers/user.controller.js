import bcrypt from "bcrypt";
import {v2 as cloudinary} from "cloudinary";
import generateToken from "../utils/generateToken.js";
import User from "../models/user.model.js";

// register user
export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    const imageFile = req.file;
    if(!name || !email || !password || !imageFile){
      return res.status(400).json({success: false, message: "missing details"});
    }
    try {
    const userExist = await User.findOne({email});
    if(userExist){
      return res.status(400).json({success: false, message: "company already exists"});
    }
      const hashedPassword = await bcrypt.hash(password, 10);
      const imageUpload = await cloudinary.uploader.upload(imageFile.path);
      const user = await User.create({
        name, 
        email,
        password: hashedPassword,
        image: imageUpload.secure_url
      });
      res.status(201).json({
        success: true, 
        user: {
         _id: user._id,
         name: user.name,
         eamil: user.email,
         image: user.image
        },
        token: generateToken(user._id)
      });
    } catch (error) {
      console.log("error in register user", error);    
      res.status(500).json({success: false, message: error.message});
    }
  }

// login user
export const loginUser = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json("wrong credentials");
    }
    res.status(200).json({
      success: true, 
      user: {
        _id: user._id,
        name: user.name,
        eamil: user.email,
        image: user.image
       },
       token: generateToken(user._id)
    });
  } catch (error) {
    console.log("error in login company", error);    
    res.status(500).json({success: false, message: error.message});
  }
}


// get user data
export const getUserData = async (req, res) => {}

// apply for a job
export const applyForJob = async (req, res) => {}

// get user applied application
export const getUserJobApplications = async (req, res) => {}

// updater user profile
export const updateUserResume = async (req, res) => {}


