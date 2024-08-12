const { login, register, users, refresh } = require("../service/user.service");
const { AppError } = require("../utils/error.utils");

async function userLogin(req, res) {
  try {
    const result = await login(req.body);
    return res.status(201).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ message: `${e.message}` });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function userRegister(req, res) {
  try {
    const result = await register(req.body);
    return res.status(201).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ message: `${e.message}` });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function userList(req, res) {
  try {
    const result = await users();
    return res.status(200).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ message: `${e.message}` });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function refreshToken(req, res) {
  try {
    const result = await refresh(req.user);
    return res.status(200).json(result);
  } catch (e) {
    if (e instanceof AppError) {
      return res.status(e.statusCode).json({ error: e.message });
    }
  }
}

module.exports = { userLogin, userRegister, userList, refreshToken };
