// Mini Project - Pertemuan 17-18: Component tree
// TODO 4: lengkapi state & susun component tree App -> PageHeader, SearchBar, MahasiswaList.
// Routing ("/" & "/tentang") sudah lengkap - fokuskan TODO pada bagian DaftarMahasiswaPage.

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import PageHeader from "./components/PageHeader";
import SearchBar from "./components/SearchBar";
import MahasiswaList from "./components/MahasiswaList";
import Tentang from "./components/Tentang";
import MahasiswaCard from "./components/MahasiswaCard";
import Profil from "./components/Profil";
import Footer from "./components/footer";

const DATA_MAHASISWA = [
  { id: 1, nama: "Andi", nim: "2024001" },
  { id: 2, nama: "Budi", nim: "2024002" },
  { id: 3, nama: "Citra", nim: "2024003" },
];

function DaftarMahasiswaPage() {
  // TODO: buat state keyword dengan useState('')
  const [keyword, setKeyword] = useState("");

  // TODO: hitung mahasiswaTersaring - filter DATA_MAHASISWA berdasarkan
  // apakah m.nama.toLowerCase() mengandung keyword.toLowerCase()
  const mahasiswaTersaring = DATA_MAHASISWA.filter((m) =>
    m.nama.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <>
      {<SearchBar keyword={keyword} onSearch={setKeyword} />}
      {<MahasiswaList mahasiswa={mahasiswaTersaring} />}
    </>
  );
}

function App() {
  return (
    <div className="app">
      <PageHeader judul="Daftar Mahasiswa" />
      <Routes>
        <Route path="/" element={<DaftarMahasiswaPage />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
