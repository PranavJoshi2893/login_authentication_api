const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
