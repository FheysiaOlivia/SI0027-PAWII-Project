// Mini Project - Pertemuan 17-18: Komponen presentational sederhana (sudah lengkap)

import { Link } from "react-router-dom";

function PageHeader({ judul }) {
  return (
    <header className="page-header">
      <h1>{judul}</h1>
      <nav>
        <Link to="/">Daftar Mahasiswa</Link>
        {" | "}
        <Link to="/tentang">Tentang</Link>
        {" | "}
        <Link to="/profil">Profil</Link>
      </nav>
    </header>
  );
}

export default PageHeader;
