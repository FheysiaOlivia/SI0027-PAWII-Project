// Mini Project - Pertemuan 17-18: Komponen anak yang mengirim event ke induk lewat callback prop
// TODO 2: lengkapi komponen ini.

function SearchBar({ keyword, onSearch }) {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Cari nama mahasiswa..."
      // TODO: set value={keyword}
      value={keyword}
      // TODO: set onChange agar memanggil onSearch(e.target.value)
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default SearchBar;
