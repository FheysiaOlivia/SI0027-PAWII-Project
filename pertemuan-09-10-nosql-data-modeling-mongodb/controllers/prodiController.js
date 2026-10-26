// // const Prodi = require("../models/prodiModel");

// // exports.getAll = async (req, res, next) => {
// //   try {
// //     const data = await Prodi.find();
// //     res.json(data);
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // exports.create = async (req, res, next) => {
// //   try {
// //     const prodi = await Prodi.create(req.body);
// //     res.status(201).json(prodi);
// //   } catch (err) {
// //     next(err);
// //   }
// // };


// const Prodi = require("../models/prodiModel");

// exports.getAll = async (req, res, next) => {
//   try {
//     const data = await Prodi.find();
//     res.json(data);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.create = async (req, res, next) => {
//   try {
//     const prodi = await Prodi.create(req.body);
//     res.status(201).json(prodi);
//   } catch (err) {
//     next(err);
//   }
// };


const Prodi = require("../models/prodiModel");

exports.getAll = async (req, res, next) => {
  try {
    const data = await Prodi.find();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const prodi = await Prodi.create(req.body);
    res.status(201).json(prodi);
  } catch (err) {
    next(err);
  }
};
