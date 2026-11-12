// Mini Project - Pertemuan 17-18: Komponen anak, menerima data lewat @Input
// TODO 1: lengkapi komponen ini agar menerima nama & nim, lalu tampilkan pada template.

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mahasiswa-card',
  standalone: true,
  templateUrl: './mahasiswa-card.component.html',
})
export class MahasiswaCardComponent {
  // TODO: tambahkan import { Input } from '@angular/core' di atas
  @Input() nama!: string;
  @Input() nim!: string;
  // TODO: deklarasikan @Input() nama!: string;
  // TODO: deklarasikan @Input() nim!: string;
}

