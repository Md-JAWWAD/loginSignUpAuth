import express from "express";
import { userSignup, userLogin, allUser} from "../Controller/user.controller.js";
import userVerify from "../Middleware/user.auth.js";

const router = express.Router()

router.post('/signup', userSignup)
router.post('/login', userLogin)
router.get("/user", userVerify, allUser)
export default router;