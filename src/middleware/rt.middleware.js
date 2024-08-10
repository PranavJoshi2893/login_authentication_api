const jwt = require("jsonwebtoken");

const authenticateRefreshToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(404).json({
      name: "NotFoundError",
      message: "Bearer token not available",
    });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json(err);
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateRefreshToken };