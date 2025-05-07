import bcrypt from "bcrypt";
import {v2 as cloudinary} from "cloudinary";
import generateToken from "../utils/generateToken.js";
import User from "../models/user.model.js";
import Job from "../models/job.model.js";
import JobApplication from "../models/jobApplication.model.js";

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
    console.log("error in login user", error);    
    res.status(500).json({success: false, message: error.message});
  }
}


// get user data
export const getUserData = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await User.findById(id);
    if(!user){
      return res.status(400).json({success: false, message: "user not found"});
    }
    res.status(200).json({success: true, user});
  } catch (error) {
    console.log("error in get user data", error);    
    res.status(500).json({success: false, message: error.message});
  }
}

// apply for a job
export const applyForJob = async (req, res) => {
  const {jobId} = req.params;
  const userId = req.user;
  try {
    const isAlreadyApplied = await JobApplication.find({jobId, userId});
    if(isAlreadyApplied.length > 0){
      return res.status(400).json({success: false, message: "Already applied for this job"});
    }
    const jobData = await Job.findById(jobId);
    if(!jobData){
      return res.status(400).json({success: false, message: "Job not available"});
    }
    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now()
    });
    res.status(200).json({success: true, message: "Applied successfully"});
  } catch (error) {
    console.log("error in apply job", error);    
    res.status(500).json({success: false, message: error.message});  
  }
}

// get user applied application
export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.user;
    const applications = await JobApplication.find({userId})
    .populate("companyId", "name email image")
    .populate("jobId", "title description location category level salary")
    .exec();
    if(!applications){
      return res.status(400).json({success: false, message: "No applications yet"});
    }
    res.status(200).json({success: true, applications});
  } catch (error) {
    console.log("error in get job applications", error);    
    res.status(500).json({success: false, message: error.message});  
  }
} 

// update user resume
export const updateUserResume = async (req, res) => {
  try {
    const userId = req.user;
    const resumeFile = req.file;
    const userData = await User.findById(userId);
    if(resumeFile){
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = resumeUpload.secure_url;
    }
    await userData.save();
    res.status(200).json({success: true, message: "Resume Updated"});
  } catch (error) {
    console.log("error in update resume", error);    
    res.status(500).json({success: false, message: error.message});  
  }
}


