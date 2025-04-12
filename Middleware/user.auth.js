import jwt from "jsonwebtoken";

const userVerify = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    let token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Not authorized",
    });
  }

  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
      next();
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export default userVerify;