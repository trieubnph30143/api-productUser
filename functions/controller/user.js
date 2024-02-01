const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function signup(req, res) {
  try {
    let checkEmail = await User.find({ email: req.body.email });

    if (checkEmail[0]) {
      return res.status(200).json({
        status: 1,
        message: "email da ton tai",
      });
    }
    let hashpassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashpassword);
    if (!hashpassword) {
      return res.status(200).json({
        status: 1,
        message: "ma hoa that bai",
      });
    }
    console.log(req.body);
    let data = await User.create({
      password: hashpassword,
      email: req.body.email,
    });

    if (!data) {
      return res.status(200).json({
        status: 1,
        message: "them that bai",
      });
    }

    return res.status(200).json({
      status: 0,
      message: "thanh ocng",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      status: 1,
      message: "loi server",
    });
  }
}

async function signin(req, res) {
  try {
    let checkEmail = await User.find({ email: req.body.email });

    if (!checkEmail[0]) {
      return res.status(200).json({
        status: 1,
        message: "email khong ton tai",
      });
    }
    let hashpassword = await bcrypt.compare(
      req.body.password,
      checkEmail[0].password
    );
    if (!hashpassword) {
      return res.status(200).json({
        status: 1,
        message: "mat khau sai",
      });
    }
    let token = jwt.sign({ id: checkEmail[0]._id }, "token");
    return res.status(200).json({
      status: 0,
      message: "dang nhap thanh ocng",
      token,
      data: checkEmail[0],
    });
  } catch (error) {
    return res.status(200).json({
      status: 1,
      message: "loi server",
    });
  }
}

async function getPagiUser(req, res) {
  try {
    const page = Number(req.query?.page);
    const size = Number(req.query?.size);
    const count = await User.countDocuments();
    let data = await User.find()

      .skip(page)
      .limit(size);

    if (!data || !data[0]) {
      return res.status(400).json({
        status: 1,
        message: "getone false",
      });
    }
    return res.status(200).json({
      status: 0,
      message: "getone success",
      data,
      count,
      page,
      size,
    });
  } catch (error) {
    return res.status(400).json({
      status: 1,
      message: error,
    });
  }
}

async function getSearchUser(req, res) {
  try {
    const page = Number(req.query?.page);
    const size = Number(req.query?.size);
    const regex = new RegExp(req.params.search, "i");

    const count = await User.countDocuments({ email: { $regex: regex } });

    const data = await User.find({ email: { $regex: regex } })
      .skip(page)
      .limit(size);

    console.log(data);
    if (!data || !data[0]) {
      return res.status(200).json({
        status: 1,
        message: "getone false",
      });
    }
    return res.status(200).json({
      status: 0,
      message: "getone success",
      data,
      count,
      page,
      size,
    });
  } catch (error) {
    return res.status(400).json({
      status: 1,
      message: error,
    });
  }
}
async function deleteUser(req, res) {
  try {
    let data = await User.findByIdAndDelete(req.params.id);
    let count = await User.countDocuments();
    if (!data) {
      return res.status(400).json({
        status: 1,
        message: "delete false",
      });
    }
    return res.status(200).json({
      status: 0,
      message: "delete success",
      data,
      count,
    });
  } catch (error) {
    return res.status(400).json({
      status: 1,
      message: error,
    });
  }
}

module.exports = { signin, signup, getPagiUser, getSearchUser, deleteUser };
