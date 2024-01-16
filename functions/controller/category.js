const category = require("../models/category");
const { ObjectId } = require("mongodb");

async function addCategory(req, res) {
  try {
    let data = await category.create(req.body);
    if (!data) {
      return res.status(400).json({
        status: 1,
        message: "add false",
      });
    }
    return res.status(200).json({
      status: 0,
      message: "add success",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      status: 1,
      message: error,
    });
  }
}
async function updateCategory(req, res) {
  try {
    let checkid = ObjectId.isValid(req.params.id);
    if (!checkid) {
      return res.status(400).json({
        status: 1,
        message: "id sai",
      });
    }

    let data = await category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(400).json({
        status: 1,
        message: "update false",
      });
    }
    return res.status(200).json({
      status: 0,
      message: "update success",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      status: 1,
      message: error,
    });
  }
}

async function deleteCategory(req, res) {
  try {
    let checkid = ObjectId.isValid(req.params.id);
    if (!checkid) {
      return res.status(400).json({
        status: 1,
        message: "id sai",
      });
    }
    let data = await category.findByIdAndDelete(req.params.id);
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
    });
  } catch (error) {
    return res.status(400).json({
      status: 1,
      message: error,
    });
  }
}

async function getOneCategory(req, res) {
  try {
    let checkid = ObjectId.isValid(req.params.id);
    if (!checkid) {
      return res.status(400).json({
        status: 1,
        message: "id sai",
      });
    }
    let data = await category.findById(req.params.id);
    if (!data) {
      return res.status(400).json({
        status: 1,
        message: "getone false",
      });
    }
    return res.status(200).json({
      status: 0,
      message: "getone success",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      status: 1,
      message: error,
    });
  }
}

async function getAllCategory(req, res) {
  try {
    let data = await category.find();
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
    });
  } catch (error) {
    return res.status(400).json({
      status: 1,
      message: error,
    });
  }
}
module.exports = {
  addCategory,
  getAllCategory,
  getOneCategory,
  deleteCategory,
  updateCategory,
};
