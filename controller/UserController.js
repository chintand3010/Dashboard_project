const UserModel = require("../model/UserModel");
const bcryptjs = require("bcryptjs");

const sequrePassword = async (password) => {
  const hashPassword = await bcryptjs.hash(password, 10);
  return hashPassword;
};

const register = async (req, res) => {
  try {
    const existUser = await UserModel.findOne({ email: req.body.email });
    if (existUser) {
      res.status(200).json({ success: true, message: "User Already Register" });
    } else {
      const password = await sequrePassword(req.body.password);
      const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: password,
      });
      const data = await user.save();
      res
        .status(200)
        .json({ success: true, data: data, message: "User Register" });
    }
    zz;
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    const password = req.body.password;
    if (user) {
      const comparePassword = await bcryptjs.compare(password, user.password);
      if (comparePassword) {
        res
          .status(200)
          .json({ success: true, message: "login Success ", data: user });
      } else {
        res
          .status(404)
          .json({ success: false, message: "User Password Wrong" });
      }
    } else {
      res.status(404).json({ success: false, message: "User Not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const upDatePassword = async (req, res) => {
  try {
    const email = req.body.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const user = await UserModel.findOne({ email: email });
    if (user) {
      console.log(user);
      const comparePassword = await bcryptjs.compare(
        oldPassword,
        user.password
      );
      if (comparePassword) {
        const password = await sequrePassword(newPassword);
        const updatePassword = await UserModel.updateOne(
          { _id: user._id },
          { $set: { password: password } }
        );
        res.status(200).json({ success: true, message: "Password Updated " });
      } else {
        res
          .status(404)
          .json({ success: false, message: "User Old Password Wrong" });
      }
    } else {
      res.status(404).json({ success: false, message: "User Not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.body.id;
    const userDelete = await UserModel.deleteOne({ _id: id });
    res
      .status(200)
      .json({ success: true, message: "User Delete ", data: userDelete });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const GetAlluser = async (req, res) => {
  try {
    const user = await UserModel.find({});
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  register,
  login,
  upDatePassword,
  deleteUser,
  GetAlluser,
};
