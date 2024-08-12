const { compare, hash } = require("bcrypt");
const prisma = require("../model/prisma-client");
const {
  NotFoundError,
  ForbiddenError,
  ConflictError,
  BadRequestError,
} = require("../utils/error.utils");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/token.utils");
const {
  PrismaClientKnownRequestError,
} = require("@prisma/client/runtime/library");

async function login(userData) {
  const user = await prisma.user.findUnique({
    where: { email: userData.email },
    select: {
      id: true,
      password: true,
      verified: true,
    },
  });

  if (!user) throw new NotFoundError("User with sepecified email ID not found");
  if (!user.verified)
    throw new ForbiddenError(
      "Your account might not be active. Please click the link in the email we sent you to activate your account."
    );

  const isMatched = await compare(userData.password, user.password);

  if (!isMatched) throw new ForbiddenError("Invalid Password");
  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  return {
    message: "Login Successful!",
    access_token: accessToken,
    refresh_token: refreshToken,
  };
}

async function register(userData) {
  try {
    const hashedPassword = await hash(userData.password, 10);

    await prisma.user.create({
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword,
      },
    });

    return { message: "New User Created" };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") throw new ConflictError("Email ID already taken");
    }
    throw new BadRequestError("An error occurred during registration");
  }
}

async function refresh(user) {
  const accessToken = await generateAccessToken(user);

  if (!accessToken) throw new NotFoundError("Access token not generated");

  return { access_token: accessToken };
}

async function users() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      verified: true,
    },
  });

  return users;
}

module.exports = { login, register, users, refresh };
