// Mini Project - Pertemuan 17-18: Komponen induk, merender banyak MahasiswaCard
// TODO 3: lengkapi komponen ini.

import { Component, Input } from '@angular/core';
import { Mahasiswa } from '../../mahasiswa.model';
import { CommonModule } from '@angular/common';
import { MahasiswaCardComponent } from '../mahasiswa-card/mahasiswa-card.component';

@Component({
  selector: 'app-mahasiswa-list',
  standalone: true,
  imports: [
    // TODO: tambahkan CommonModule dari '@angular/common' (untuk *ngIf/*ngFor)
    // TODO: tambahkan MahasiswaCardComponent dari '../mahasiswa-card/mahasiswa-card.component'
    CommonModule, MahasiswaCardComponent
  ],
  templateUrl: './mahasiswa-list.component.html',
})
export class MahasiswaListComponent {
  // TODO: tambahkan import { Input } from '@angular/core' di atas
  // TODO: deklarasikan @Input() mahasiswa: Mahasiswa[] = [];
  @Input() mahasiswa: Mahasiswa[] = []
}
