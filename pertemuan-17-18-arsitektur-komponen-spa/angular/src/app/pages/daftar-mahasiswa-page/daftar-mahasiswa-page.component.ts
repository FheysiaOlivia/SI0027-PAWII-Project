// Mini Project - Pertemuan 17-18: Halaman daftar mahasiswa
// TODO 4: lengkapi state & susun component tree DaftarMahasiswaPage -> SearchBar, MahasiswaList.

import { Component } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MahasiswaListComponent } from '../../components/mahasiswa-list/mahasiswa-list.component';
import { Mahasiswa } from '../../mahasiswa.model';

const DATA_MAHASISWA: Mahasiswa[] = [
  { id: 1, nama: 'Andi', nim: '2024001' },
  { id: 2, nama: 'Budi', nim: '2024002' },
  { id: 3, nama: 'Citra', nim: '2024003' },
];

@Component({
  selector: 'app-daftar-mahasiswa-page',
  standalone: true,
  imports: [SearchBarComponent, MahasiswaListComponent],
  templateUrl: './daftar-mahasiswa-page.component.html',
})
export class DaftarMahasiswaPageComponent {
  keyword = '';

  // TODO: buat getter mahasiswaTersaring() yang mengembalikan Mahasiswa[]
  // dengan memfilter DATA_MAHASISWA berdasarkan apakah
  // m.nama.toLowerCase() mengandung this.keyword.toLowerCase()
  get mahasiswaTersaring(): Mahasiswa[]{
    return DATA_MAHASISWA.filter((m)=> m.nama.toLowerCase().includes(this.keyword.toLowerCase()))
  }
  onSearch(keyword: string) {
    this.keyword = keyword;
  }
}
