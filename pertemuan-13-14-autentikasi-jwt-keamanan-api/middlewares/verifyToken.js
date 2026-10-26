// Mini Project - Pertemuan 13-14: Middleware Verifikasi Token
// TODO 2: lengkapi middleware di bawah ini.

const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // TODO: ambil header Authorization dari req.headers.authorization
  const header = req.headers.authorization;
  //   jika tidak ada -> throw { status: 401, message: 'Token tidak ditemukan' }
  if(!header){
    throw { status: 401, message: "Token tidak ditemukan" };
  }
  // TODO: ambil token dari header (format "Bearer <token>"), pisahkan dengan .split(' ')[1]
  const token= header.split(' ')[1];
  try{
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  }catch(error){
    throw{
      status: 401,
      message: "Token tidak ditemukan"
    };
  }
  // TODO: verifikasi dengan jwt.verify(token, process.env.JWT_SECRET) di dalam try/catch
  //   jika valid -> simpan hasilnya ke req.user, lalu panggil next()
  //   jika gagal (catch) -> throw { status: 401, message: 'Token tidak valid/kedaluwarsa' }
}

module.exports = verifyToken;
