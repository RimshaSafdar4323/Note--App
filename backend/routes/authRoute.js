// import express from "express";
// import { addUser, getUser} from "../controllers/authController.js";

// const router = express.Router();

// router.post("/signup", addUser);
// router.get("/login/:id", getUser);

// export default router;
import express from "express";
import { loginUser, signupUser } from "../controllers/authController.js";
const router = express.Router();


//login route
router.post("/login",loginUser)

//signup route
router.post("/signup",signupUser)


export default router;