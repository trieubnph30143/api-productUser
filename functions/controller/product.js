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
    let count = await product.countDocuments();
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
    const page = Number(req.query?.page);
    const size = Number(req.query?.size) || 2;
    const count = await product.countDocuments();

    const data = await product
      .find({})
      .populate("categoryId")
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
async function getAllCategoryProduct(req, res) {
  try {
    const page = Number(req.query?.page);
    const size = Number(req.query?.size) || 2;
    const count = await product.countDocuments({ categoryId: req.params.id });

    const data = await product
      .find({ categoryId: req.params.id })
      .populate("categoryId")
      .skip(page)
      .limit(size);
    console.log(data);
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

async function getSearchCategoryProduct(req, res) {
  try {
    const page = Number(req.query?.page);
    const size = Number(req.query?.size) || 2;
    const regex = new RegExp(req.params.search, "i");

    const count = await product.countDocuments({ title: { $regex: regex } });

    const data = await product
      .find({ title: { $regex: regex } })
      .populate("categoryId")
      .skip(page)
      .limit(size);

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
async function getSearchDebouceProduct(req, res) {
  try {
    const regex = new RegExp(req.query?.search, "i");

    const data = await product
      .find({ title: { $regex: regex } })
      .populate("categoryId");
    
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
    });
  } catch (error) {
    return res.status(400).json({
      status: 1,
      message: error,
    });
  }
}
async function getFilterCategoryProduct(req, res) {
  try {
    const page = Number(req.query?.page);
    const size = Number(req.query?.size) || 2;
    let id = req.body.id;

    const count = await product.countDocuments({
      categoryId: {
        $in: id,
      },
    });

    const data = await product
      .find({
        categoryId: {
          $in: id,
        },
      })
      .populate("categoryId")
      .skip(page)
      .limit(size);

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
module.exports = {
  addProduct,
  getAllProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
  getAllCategoryProduct,
  getSearchCategoryProduct,
  getFilterCategoryProduct,
  getSearchDebouceProduct,
};
