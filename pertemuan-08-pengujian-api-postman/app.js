const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Data sementara laporan barang
let laporan = [
  {
    id: "1",
    jenis: "Hilang",
    nama_barang: "Dompet Hitam",
    deskripsi: "Dompet hitam berisi kartu mahasiswa",
    lokasi: "Gedung A",
    tanggal: "2026-10-20",
    status: "menunggu",
  },
  {
    id: "2",
    jenis: "Ditemukan",
    nama_barang: "Tumbler Pink",
    deskripsi: "Tumbler pink tertinggal di perpustakaan",
    lokasi: "Perpustakaan",
    tanggal: "2026-10-21",
    status: "terverifikasi",
  },
];

// GET: Semua laporan
app.get("/api/laporan", (req, res) => {
  res.status(200).json({
    status: "success",
    data: laporan,
  });
});

// GET: Detail laporan berdasarkan ID
app.get("/api/laporan/:id", (req, res) => {
  const data = laporan.find((item) => item.id === req.params.id);

  if (!data) {
    return res.status(404).json({
      status: "error",
      message: "Laporan tidak ditemukan",
    });
  }

  res.status(200).json({
    status: "success",
    data: data,
  });
});

// POST: Tambah laporan
app.post("/api/laporan", (req, res) => {
  const { jenis, nama_barang, deskripsi, lokasi, tanggal, status } = req.body;

  if (!jenis || !nama_barang || !deskripsi || !lokasi || !tanggal || !status) {
    return res.status(400).json({
      status: "error",
      message: "Semua field wajib diisi",
    });
  }

  const newLaporan = {
    id: String(Math.max(0, ...laporan.map((item) => Number(item.id))) + 1),
    jenis,
    nama_barang,
    deskripsi,
    lokasi,
    tanggal,
    status,
  };

  laporan.push(newLaporan);

  res.status(201).json({
    status: "success",
    data: newLaporan,
  });
});

// PUT: Update laporan
app.put("/api/laporan/:id", (req, res) => {
  const index = laporan.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "Laporan tidak ditemukan",
    });
  }

  laporan[index] = {
    ...laporan[index],
    ...req.body,
    id: laporan[index].id,
  };

  res.status(200).json({
    status: "success",
    data: laporan[index],
  });
});

// DELETE: Hapus laporan
app.delete("/api/laporan/:id", (req, res) => {
  const index = laporan.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "Laporan tidak ditemukan",
    });
  }

  const deletedLaporan = laporan.splice(index, 1)[0];

  res.status(200).json({
    status: "success",
    data: deletedLaporan,
  });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
