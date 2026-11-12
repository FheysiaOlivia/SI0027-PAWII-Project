// Mini Project - Pertemuan 17-18: Komponen anak yang mengirim event ke induk lewat @Output()
// TODO 2: lengkapi komponen ini.

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  // TODO: tambahkan import { EventEmitter, Input, Output } from '@angular/core' di atas
  // TODO: deklarasikan @Input() keyword = '';
  @Input() keyword = '';
  @Output() search = new EventEmitter
  // TODO: deklarasikan @Output() search = new EventEmitter<string>();

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    // TODO: panggil this.search.emit(value);
    this.search.emit(value);
  }
}
