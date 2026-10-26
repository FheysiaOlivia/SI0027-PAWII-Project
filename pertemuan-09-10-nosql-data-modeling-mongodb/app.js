// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();
// const PORT = process.env.PORT || 3000;

// const mahasiswaRoutes = require("./routes/mahasiswaRoutes");
// const prodiRoutes = require("./routes/prodiRoutes");

// app.use(express.json());

// app.use("/mahasiswa", mahasiswaRoutes);
// app.use("/prodi", prodiRoutes);

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log("Terhubung ke MongoDB Atlas");

//     app.listen(PORT, () => {
//       console.log(`Server berjalan di http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Gagal terhubung:", err.message);
//   });


require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

const mahasiswaRoutes = require("./routes/mahasiswaRoutes");
const prodiRoutes = require("./routes/prodiRoutes");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());

app.use("/mahasiswa", mahasiswaRoutes);
app.use("/prodi", prodiRoutes);

app.use((req, res, next) => {
  const err = new Error("Endpoint tidak ditemukan");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Terhubung ke MongoDB Atlas");

    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Gagal terhubung:", err.message);
    process.exit(1);
  });
