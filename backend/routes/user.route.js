import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import upload from "../config/multer.js";
import { protectUser } from "../middlware/auth.js";


const router = express.Router();

router.post("/register", upload.single("image"), registerUser);
router.post("/login", loginUser);

export default router;