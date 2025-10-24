require("dotenv").config();
const UserModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
async function loginController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Some required fields are missing" });
  }

  try {
    const foundUserInDB = await UserModel.findOne({ email });
    if (!foundUserInDB) {
      return res.status(400).send({ message: "User not found." });
    }

    //check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUserInDB.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).send({ message: "Invalid credentials." });
    }

    // create jwt accessToken and refreshToken
    const refreshToken = jwt.sign(
      {
        username: foundUserInDB.username,
        email: foundUserInDB.email,
      },
      process.env.JWT_SECRET_REFRESH_TOKEN,
      {
        expiresIn: "2d",
      }
    );

    // save refresh token in DB and send in Http Only Cookies Header for Security and Generating new Access Token (when expires)
    foundUserInDB.refreshToken = refreshToken;
    await foundUserInDB.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true, //not accessible from js
      maxAge: 1000 * 60 * 60 * 48, //2 days,
      secure: true, //https only
      sameSite: "None", // because frontend and backend are on different Domains
      //Will secure CSRF attacks with CORS
    });

    const accessToken = jwt.sign(
      {
        username: foundUserInDB.username,
        email: foundUserInDB.email,
        roles: foundUserInDB.roles,
      },
      process.env.JWT_SECRET_ACCESS_TOKEN,
      {
        // TODO, change expires to 15 min
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      username: foundUserInDB.username,
      email: foundUserInDB.email,
      avatar: foundUserInDB.avatar,
      roles: foundUserInDB.roles,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function registerController(req, res) {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res
      .status(400)
      .send({ message: "Some required fields are missing" });
  }

  try {
    const isUserAlreadyInDB = await UserModel.findOne({ email });
    if (isUserAlreadyInDB) {
      return res.status(400).send({ message: "User already exists." });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 16);

    await UserModel.create({
      ...req.body,
      password: hashedPassword,
      avatar: "",
    });

    return res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function logoutController(req, res) {
  const cookies = req.cookies;
  console.log("🚀 ~ logoutController ~ cookies:", cookies);

  if (!cookies?.jwt) {
    //cookie already do not exists in req header
    res.sendStatus(204);
  }

  // If cookie exists , Check which user made req and delete from DB refreshToken and clear cookies
  const refreshToken = cookies.jwt;

  try {
    const foundUser = await UserModel.findOne({ refreshToken });
    if (!foundUser) {
      //Clear the cookie
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });

      return res.sendStatus(204); //Successful but no content
    }

    foundUser.refreshToken = "";
    foundUser.save();
    //Clear the cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.sendStatus(204);
  } catch (error) {}
}

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_GMAIL_PASSWORD_USER,
    pass: process.env.NODEMAILER_GMAIL_PASSWORD,
  },
});
const generatedOtpCode = Math.floor(Math.random() * 99000 + 10000);
async function forgotPasswordController(req, res) {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "No email was provided" });
  }

  try {
    const foundUser = await UserModel.findOne({ email });

    if (!foundUser) {
      res.status(400).json({ message: "User not found" });
    }

    // send email with OTP password
    const isTransporterReady = await mailTransporter.verify();

    if (!isTransporterReady) {
      throw new Error(
        "Something went wrong when sending email, Please try again."
      );
    }

    await mailTransporter.sendMail({
      from: `${process.env.NODEMAILER_GMAIL_PASSWORD_USER}`,
      to: `${foundUser.email}`,
      subject: "Forgot password code",
      text: `Your one time password code: ${generatedOtpCode}, Type this code in your app, The code expires in 1hr`,
      html: `<p>Your one time password code: </p><b>${generatedOtpCode}</b> <br/> <p>Type this code in your app, <b>The code expires in 1hr</b></p>`,
    });

    // save otp in DB
    foundUser.otp = generatedOtpCode;
    foundUser.otpCreatedAt = Date.now();
    foundUser.save();

    // TODO: delete otp code in 1 hr from db during checking if otp is valid check if its not expired

    res
      .status(200)
      .json({ message: "The reset password code was sent to your email." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  //send email
}

const now = Date.now(); //curr time in ms
const otpExpireTime = 1000 * 60 * 1; //1min in ms
async function checkOTPController(req, res) {
  const { otp, email } = req.body;

  if (!otp || !email) {
    res.status(400).json({ message: "Some required fields are missing." });
  }

  try {
    const foundUserWithOtp = await UserModel.findOne({ otp, email });
    if (!foundUserWithOtp) {
      res.status(400).json({ message: "The code is invalid." });
    }

    // check if otp isnt expired

    if (foundUserWithOtp.otpCreatedAt + otpExpireTime < now) {
      res
        .status(400)
        .json({ message: "The code has expired, please try again." });
    }

    // if user was found and otp is valid and matches
    foundUserWithOtp.otpVerified = true;
    foundUserWithOtp.otp = null;

    foundUserWithOtp.save();

    res.status(200).json({ message: "Code is valid" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function newPasswordController(req, res) {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    res.status(400).json({ message: "Some required fields are missing" });
  }

  const foundUser = await UserModel.findOne({ email });

  if (!foundUser) {
    res.status(400).json({ message: "User not found" });
  }

  const hasUserVerifiedOTP = foundUser.otpVerified;
  const hasExpiredOTP = foundUser.otpCreatedAt;

  if (!hasUserVerifiedOTP) {
    res
      .status(400)
      .json({ message: "User has not validated verification code" });
  }

  // /if expired delete verified and time created
  if (hasExpiredOTP + otpExpireTime < now) {
    foundUser.otpVerified = false;
    foundUser.otpCreatedAt = null;
    foundUser.save();
    res
      .status(400)
      .json({ message: "The code has expired, please try again." });
  }

  //save new password in db
  foundUser.password = await bcrypt.hash(newPassword, 16);
  foundUser.otpVerified = false;
  foundUser.otpCreatedAt = null;
  foundUser.save();

  res.status(200).json({ message: "Password was changed successfully" });
}
async function refreshTokenController(req, res) {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.status(401).json({ message: "Unauthorized" });
  }

  const refreshToken = cookies.jwt;

  try {
    const foundUser = await UserModel.findOne({ refreshToken });

    if (!foundUser) {
      res.status(403).json({ message: "Forbidden" });
    }

    jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_REFRESH_TOKEN,
      (err, decoded) => {
        if (err || foundUser.email !== decoded.email) {
          //TODO. logout when the token is expired
          res.status(403).json({ message: "Forbidden" });
        }

        //create new accessToken

        const jwtNewAccessToken = jwt.sign(
          {
            username: foundUser.username,
            email: foundUser.email,
            roles: foundUser.roles,
          },
          process.env.JWT_SECRET_ACCESS_TOKEN,
          // TODO change to 15 min
          { expiresIn: "1d" }
        );

        if (!jwtNewAccessToken) {
          return res
            .status(500)
            .json({ message: "Error creating new access token" });
        }

        res.status(200).json({ accessToken: jwtNewAccessToken });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  loginController,
  registerController,
  forgotPasswordController,
  checkOTPController,
  newPasswordController,
  refreshTokenController,
  logoutController,
};
