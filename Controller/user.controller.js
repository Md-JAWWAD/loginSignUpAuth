import model from "../Model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// const getUserData = async (req, res) => {
//     try {
//         const getAllUsers = await model.find()
//     } catch (error) {

//     }
// }

// Simple SignUp and Login Apis Creation Without Authentication:

// const userSignup = async (req, res) => {
//   try {
//     const userStoredData = await model.create(req.body);
//     const { name, email, password } = userStoredData;
//     res
//       .status(200)
//       .json({ message: "user stored", data: `Name: ${name} Email: ${email}` });
//   } catch (error) {
//     res.status(404).json({ message: `${error}` });
//   }
// };

// const userLogin = async (req, res) => {
//   try {
//     const { email, password } = await req.body;
//     const userStoredData = await model.find({email, password});
//     !userStoredData
//       ? // const { email, password } = userStoredData;
//         res.status(404).json({ message: `Email or Password Wrong` })
//       : res
//           .status(200)
//           .json({ message: "Login Successfully", data: `Email: ${email}` })
//           getUserData()
//   } catch (error) {
//     res.status(404).json({ message: `${error}` });
//   }
// };

const allUser = async (req, res) => {
  let getAllUsersUsers;
  getAllUsersUsers = await model.find({});
  if (getAllUsers) return res.send(getAllUsers);
};

const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await model.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user object
    const userObj = {
      name,
      email,
      password: hashPassword,
    };

    // Save user to database
    const userStored = await model.create(userObj);

    delete userStored.password;

    // // Remove password from response
    // const userResponse = {
    //   _id: userStored._id,
    //   name: userStored.name,
    //   email: userStored.email,
    //   createdAt: userStored.createdAt,
    // };

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      data: userResponse,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = await req.body;
    if (!email || !password)
      return res.json({ message: "Email and Password required" });
    // console.log(password);
    const userDataforLogin = await model.findOne({ email });
    // console.log(userDataforLogin.password)
    if (!userDataforLogin) return res.json({ message: "Invalid Email" });

    var comparePassword = await bcrypt.compare(
      password,
      userDataforLogin.password
    );
    if (!comparePassword) {
      return res.json({ message: "Invalid Password" });
    } else {
      return res.json({ message: "Login Successfull" });
    }

    let token = jwt.sign(
      { userId: userDataforLogin._id },
      { email: userDataforLogin.email },
      process.env.JWT_SECRET_KEY
    );

    res.send(token);
  } catch (error) {
    res.json({ message: `${error}` });
  }
};

export { userSignup, userLogin, allUser };
