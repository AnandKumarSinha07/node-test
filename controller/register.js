const registerModel = require("../model/register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Validation = require("../validation/validation");

const Register = async (req, res) => {
  try {
    const { Name, email, password, profilePic, role } = req.body;
    console.log(Name,email,password,profilePic,role)

    const error =  Validation({ Name,role,email, password });
    console.log("error",error)
    if (error) {
      return res.status(400).json({ msg: error });
    }

    if (!Name || !email || !password || !profilePic || !role) {
       return res.status(404).json({
        msg: `Enter All the required field!!`,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log("hasPassword", hashPassword);

    const UserRegistraion = await registerModel.create({
      Name: Name,
      email: email,
      password: hashPassword,
      profilePic: profilePic,
      role: role,
    });

    const token = jwt.sign({ id: UserRegistraion._id }, "Anand123@", {
      expiresIn: "1d"
    });
    res.cookie("token", token);
    const savedUser = await UserRegistraion.save();
    return res.status(200).json({
      msg: `User Register Successfully!!`,
      savedUser: savedUser,
    });
  } catch (error) {
    console.log(`Error in the Register api  `, error.message);
    return res.status(400).json({
      msg: `Error in the register api routes ${error.message} `,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await registerModel.findOne({ email: email });
    console.log("email is", findUser);
    if (!findUser) {
      return res.status(404).json({
        msg: `Not Authrozized Person Enter valid email id!!`,
      });
    }

    const verifyPassword = await bcrypt.compare(password, findUser.password);
    if (!verifyPassword) {
      return res.status(404).json({
        msg: `Password did not match!!`,
      });
    }

    const token = jwt.sign({ id: findUser._id }, "Anand123@", {
      expiresIn: "1d",
    });
    res.cookie("token", token);

    res.status(200).json({
      msg: `Login Successfull!!`,
      token: token,
    });
  } catch (error) {
    console.log(`Error in the Login api  `, error.message);
    return res.status(400).json({
      msg: `Error in the Login api routes ${error.message} `,
    });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId is ", userId);

    const findUser = await registerModel.findById(userId);
    if (!findUser) {
      return res.status(404).json({
        msg: `Not Authorized  person!!`,
      });
    }

    return res.status(200).json({
      msg: `Profile fetched successfully!!`,
      findUser: findUser,
    });
  } catch (error) {
    console.log("Error in the All user api ", error.message);
    return res.status(404).json({
      msg: `Error in the  All user api  ${error.message} `,
    });
  }
};

const AllUser = async (req, res) => {
  try {
    const findUser = await registerModel.find();
    if (!findUser) {
      return res.status(404).json({
        msg: `Not Authorized  person!!`,
      });
    }

    return res.status(200).json({
      msg: `All Profile fetched successfully!!`,
      findUser: findUser,
    });
  } catch (error) {
    console.log("Error in the All user api ", error.message);
    return res.status(404).json({
      msg: `Error in the  All user api  ${error.message} `,
    });
  }
};

const UpdateUserApi = async (req, res) => {
  try {
    const { Name, profilePic } = req.body;

    if (!Name || Name.trim() === "") {
      return res
        .status(400)
        .json({ msg: "Name is required and cannot be empty." });
    }
    if (!profilePic || profilePic.trim() === "") {
      return res
        .status(400)
        .json({ msg: "Profile picture is required and cannot be empty." });
    }

    const finduser = await registerModel.findByIdAndUpdate(
      req.user.id,
      { Name, profilePic },
      { new: true, runValidators: true }
    );

    if (!finduser) {
      return res.status(404).json({ msg: "User not found." });
    }

    console.log("Updated document:", finduser);

    return res.status(200).json({
      msg: "Profile Updated successfully!",
      finduser: finduser,
    });
  } catch (error) {
    console.error("Error in the UpdateUserApi:", error);
    return res
      .status(500)
      .json({ msg: `Internal Server Error: ${error.message}` });
  }
};

module.exports = { Register, Login, getMyProfile, AllUser, UpdateUserApi };
