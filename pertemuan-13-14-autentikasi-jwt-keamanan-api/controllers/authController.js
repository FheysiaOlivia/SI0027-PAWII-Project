// Mini Project - Pertemuan 13-14: Register & Login
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// TODO 1: lengkapi kedua fungsi di bawah ini.
exports.register = async (req, res) => {
  try {
    // Ambil username & password dari req.body
    const { username, password } = req.body;
    // Hash password dengan bcrypt.hash(password, 10)
    const hashedPassword = await bcrypt.hash(password, 10);
    // Simpan user baru dengan User.create
    const user = await User.create({
      username,
      password: hashedPassword,
    });
    // Kirim res.status(201).json
    // (JANGAN pernah mengirim balik password, meski sudah di-hash)
    return res.status(201).json({
      id: user._id,
      username: user.username,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal melakukan registrasi",
      error: error.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    // Ambil username & password dari req.body
    const { username, password } = req.body;
    // Cari user dengan User.findOne
    const user = await User.findOne({ username });
    // Jika user tidak ditemukan
    if (!user) {
      return res.status(401).json({
        message: "Username/password salah",
      });
    }

    // Bandingkan password dengan bcrypt.compare
    const isMatch = await bcrypt.compare(password, user.password);
    // Jika password tidak cocok
    if (!isMatch) {
      return res.status(401).json({
        message: "Username/password salah",
      });
    }

    // Buat token dengan jwt.sign (menggunakan secret key dari environment variable)
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }, // Opsional: Token kedaluwarsa dalam 1 hari
    );
    // Kirim res.json({ token })
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};
res.json({token});