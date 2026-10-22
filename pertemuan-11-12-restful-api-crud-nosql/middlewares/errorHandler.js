function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || "Terjadi kesalahan";

  // Validation Error
  if (err.name === "ValidationError") {
    status = 400;
    message = err.message;
  }

  // Cast Error
  if (err.name === "CastError") {
    status = 400;
    message = `Format ${err.path} tidak valid`;
  }

  // Duplicate Key Error
  if (err.code === 11000) {
    status = 400;
    message = "Data unik sudah ada";
  }

  // Kirim response error
  res.status(status).json({ message });
}

module.exports = errorHandler;
