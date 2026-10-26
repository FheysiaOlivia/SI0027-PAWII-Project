function errorHandler(err, req, res, next) {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  let status = err.status || err.statusCode || 500;
  let message = err.message || "Terjadi kesalahan pada server";

  if (err.name === "CastError") {
    status = 400;
    message = "ID atau format data tidak valid";
  }

  if (err.name === "ValidationError") {
    status = 400;
    message = err.message;
  }

  if (err.code === 11000) {
    status = 409;
    message = "Data sudah tersedia atau duplikat";
  }

  res.status(status).json({
    success: false,
    message,
  });
}

module.exports = errorHandler;
