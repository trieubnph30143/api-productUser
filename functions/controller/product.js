const product = require("../models/product");
const { ObjectId } = require("mongodb");

async function addProduct(req, res) {
  try {
    let data = await product.create(req.body);
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
async function updateProduct(req, res) {
  try {
    let checkid = ObjectId.isValid(req.params.id);
    if (!checkid) {
      return res.status(400).json({
        status: 1,
        message: "id sai",
      });
    }

    let data = await product.findByIdAndUpdate(req.params.id, req.body, {
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

async function deleteProduct(req, res) {
  try {
    let checkid = ObjectId.isValid(req.params.id);
    if (!checkid) {
      return res.status(400).json({
        status: 1,
        message: "id sai",
      });
    }
    let data = await product.findByIdAndDelete(req.params.id);
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

async function getOneProduct(req, res) {
  try {
    let checkid = ObjectId.isValid(req.params.id);
    if (!checkid) {
      return res.status(400).json({
        status: 1,
        message: "id sai",
      });
    }
    let data = await product
      .findById(req.params.id)
      .populate("categoryId")
      .exec();
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

async function getAllProduct(req, res) {
  try {
    let data = await product.find().populate("categoryId").exec();
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
  addProduct,
  getAllProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
};
