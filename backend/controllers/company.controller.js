import Company from "../models/company.model.js";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/job.model.js";
import JobApplication from "../models/jobApplication.model.js";

// register new company
export const registerCompany = async (req, res) => {
  const {name, email, password} = req.body;
  const imageFile = req.file;
  if(!name || !email || !password || !imageFile){
    return res.status(400).json({success: false, message: "missing details"});
  }
  try {
  const companyExist = await Company.findOne({email});
  if(companyExist){
    return res.json({success: false, message: "company already exists"});
  }
    const hashedPassword = await bcrypt.hash(password, 10);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    const company = await Company.create({
      name, 
      email,
      password: hashedPassword,
      image: imageUpload.secure_url
    });
    res.status(201).json({
      success: true, 
      company: {
       _id: company._id,
       name: company.name,
       eamil: company.email,
       image: company.image
      },
      token: generateToken(company._id)
    });
  } catch (error) {
    console.log("error in register company", error);    
    res.status(500).json({success: false, message: error.message});
  }
}

// login company
export const loginCompany = async (req, res) => {
  const {email, password} = req.body;
  try {
    const company = await Company.findOne({email});
    const isMatch = await bcrypt.compare(password, company.password);
    if(!isMatch){
      return res.json({success: false, message: "wrong credentials"});
    } 
    res.status(200).json({
      success: true, 
      company: {
        _id: company._id,
        name: company.name,
        eamil: company.email,
        image: company.image
       },
       token: generateToken(company._id)
    });
  } catch (error) {
    console.log("error in login company", error);    
    res.status(500).json({success: false, message: error.message});
  }
}

// get company data
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.status(200).json({success: true, company});
  } catch (error) {
    console.log("error in get company data", error);    
    res.status(500).json({success: false, message: error.message});
  }
}

// post a new job
export const postJob = async (req, res) => {
  const {title, description, location, salary, level, category} = req.body;
  const companyId = req.company._id;
  try {
    const newJob = new Job({
      title, 
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category
    });
    await newJob.save();
    res.status(201).json({success: true, newJob});
  } catch (error) {
    console.log("error in post job", error);    
    res.status(500).json({success: false, message: error.message});
  }
}

// get company job applicants
export const getCompanyJobApplicants = async (req, res) => {}

// get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({companyId});
    // adding number of applicants infos in data
    const jobsData = await Promise.all(jobs.map(async (job) => {
      const applicants = await JobApplication.find({jobId: job._id});
      return {...job.toObject(), applicants: applicants.length}
    }))
    res.status(200).json({success: true, jobsData});
  } catch (error) {
    console.log("error in get company posted jobs", error);    
    res.status(500).json({success: false, message: error.message});
  }
}

// change job application status
export const changeJobApplicationStatus = async (req, res) => {}

// change job visibiliy
export const changeVisibiliy = async (req, res) => {
  const companyId = req.company._id;
  const {id} = req.body;
  const job = await Job.findById(id);
  try {
    if(companyId.toString() === job.companyId.toString()){
      job.visible = !job.visible;
    }
    await job.save();
    res.status(200).json({success: true, job});
  } catch (error) {
    console.log("error in change visibility of jobs", error);    
    res.status(500).json({success: false, message: error.message});
  }
}





