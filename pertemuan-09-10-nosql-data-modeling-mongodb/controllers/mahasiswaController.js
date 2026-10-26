// const Mahasiswa = require("../models/mahasiswaModel");

// exports.getAll = async (req, res) => {
//   try {
//     const data = await Mahasiswa.find().populate("prodiId");
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getById = async (req, res) => {
//   try {
//     const data = await Mahasiswa.findById(req.params.id).populate("prodiId");

//     if (!data) {
//       return res.status(404).json({ message: "Tidak ditemukan" });
//     }

//     res.json(data);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.create = async (req, res) => {
//   try {
//     const mahasiswa = await Mahasiswa.create(req.body);
//     res.status(201).json(mahasiswa);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.update = async (req, res) => {
//   try {
//     const data = await Mahasiswa.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!data) {
//       return res.status(404).json({ message: "Tidak ditemukan" });
//     }

//     res.json(data);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.remove = async (req, res) => {
//   try {
//     const data = await Mahasiswa.findByIdAndDelete(req.params.id);

//     if (!data) {
//       return res.status(404).json({ message: "Tidak ditemukan" });
//     }

//     res.status(204).send();
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };


const Mahasiswa = require("../models/mahasiswaModel");

exports.getAll = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const requestedLimit = parseInt(req.query.limit, 10) || 10;
    const limit = Math.min(100, Math.max(1, requestedLimit));
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.nama) {
      filter.nama = {
        $regex: req.query.nama,
        $options: "i",
      };
    }

    if (req.query.nim) {
      filter.nim = {
        $regex: req.query.nim,
        $options: "i",
      };
    }

    if (req.query.prodiId) {
      filter.prodiId = req.query.prodiId;
    }

    const allowedSortFields = ["nama", "nim", "createdAt"];

    const sortField = allowedSortFields.includes(req.query.sort)
      ? req.query.sort
      : "nama";

    const sortOrder = req.query.order === "desc" ? -1 : 1;

    const allowedFields = ["nama", "nim", "alamat", "prodiId", "createdAt"];

    let selectedFields = allowedFields;

    if (req.query.fields) {
      selectedFields = req.query.fields
        .split(",")
        .map((field) => field.trim())
        .filter((field) => allowedFields.includes(field));

      if (selectedFields.length === 0) {
        const err = new Error("Field yang diminta tidak valid");
        err.status = 400;
        throw err;
      }
    }

    const projection = selectedFields.join(" ");

    const [data, total] = await Promise.all([
      Mahasiswa.find(filter)
        .select(projection)
        .populate("prodiId")
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit),
      Mahasiswa.countDocuments(filter),
    ]);

    res.json({
      success: true,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const data = await Mahasiswa.findById(req.params.id).populate("prodiId");

    if (!data) {
      const err = new Error("Mahasiswa tidak ditemukan");
      err.status = 404;
      throw err;
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const mahasiswa = await Mahasiswa.create(req.body);
    res.status(201).json(mahasiswa);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const data = await Mahasiswa.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      const err = new Error("Mahasiswa tidak ditemukan");
      err.status = 404;
      throw err;
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const data = await Mahasiswa.findByIdAndDelete(req.params.id);

    if (!data) {
      const err = new Error("Mahasiswa tidak ditemukan");
      err.status = 404;
      throw err;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
