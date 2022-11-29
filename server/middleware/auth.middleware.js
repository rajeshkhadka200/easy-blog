import jwt from "jsonwebtoken";
export const authMiddleware = async (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token) {
    return res.status(401).json({
      message: "No token, authorization denied",
    });
  }
  try {
    const tokenDetail = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
    req.user = tokenDetail;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired",
      });
    }
    return res.status(403).json({
      message: "Token is not valid",
    });
  }
};
