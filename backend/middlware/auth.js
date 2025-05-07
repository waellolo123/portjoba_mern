import jwt from "jsonwebtoken";
import Company from "../models/company.model.js";
import User from "../models/user.model.js";



export const protectCompany = async (req, res, next) => {
  const token = req.headers.token;
  if(!token){
    return res.json({success: false, message: "Not authorized!"});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.company = await Company.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
}


export const protectUser = async (req, res, next) => {
  const token = req.headers.token;
  if(!token){
    return res.json({success: false, message: "Not authorized!"});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
}


