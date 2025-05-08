import Job from "../models/job.model.js";


export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({visible: true})
    .populate({path: "companyId", select: "-password"});
    // .populate("companyId").select("-password");
    res.status(200).json({success: true, jobs});
    if(typeof(jobs) === Array){
      console.log("this is array");
    } else {
      console.log("this is toObject");
    }
    
  } catch (error) {
    console.log("error in get all jobs", error);    
    res.status(500).json({success: false, message: error.message});
  }
}

export const getJobById = async (req, res) => {
  try {
    const {id} = req.params;
    const job = await Job.findById(id)
    .populate({path: "companyId", select: "-password"});
    if(!job){
      return res.status(400).json({success: false, message: "job not found"});
    }
    res.status(200).json({success: true, job});
  } catch (error) {
    console.log("error in get single job", error);    
    res.status(500).json({success: false, message: error.message});
  }
}
