import express from "express";
import { applyForJob, getUserData, getUserJobApplications, loginUser, registerUser, updateUserResume } from "../controllers/user.controller.js";
import upload from "../config/multer.js";
import { protectUser } from "../middlware/auth.js";


const router = express.Router();

router.post("/register", upload.single("image"), registerUser);
router.post("/login", loginUser);
router.get("/user/:id", getUserData);
router.post("/apply/:jobId", protectUser, applyForJob);
router.get("/applications", protectUser, getUserJobApplications);
router.post("/update-resume", protectUser, upload.single("resume"), updateUserResume);

export default router; 