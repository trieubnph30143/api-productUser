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
    let count = await category.countDocuments();
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
    let data = await category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "categoryId",
          as: "products",
        },
      },
    ]);
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
async function getPagiCategory(req, res) {
  try {
    const page = Number(req.query?.page);
    const size = Number(req.query?.size) || 2;
    const count = await category.countDocuments();
    let data = await category
      .aggregate([
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "categoryId",
            as: "products",
          },
        },
      ])
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

async function getSearchCategory(req, res) {
  try {
    const page = Number(req.query?.page);
    const size = Number(req.query?.size) || 2;
    const regex = new RegExp(req.params.search, "i");

    const count = await category.countDocuments({ name: { $regex: regex } });

    const data = await category
      .aggregate([
        {
          $match: {
            name: {
              $regex: regex,
            },
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "categoryId",
            as: "products",
          },
        },
      ])
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
module.exports = {
  addCategory,
  getAllCategory,
  getOneCategory,
  deleteCategory,
  updateCategory,
  getPagiCategory,
  getSearchCategory,
};
