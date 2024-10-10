import { Component } from '@angular/core';

@Component({
  selector: 'size-modal',
  templateUrl: './size-modal.component.html',
  styleUrl: './size-modal.component.css',
})
export class SizeModalComponent {
  isOpen = false;
  name: string = '';
  gender: string = '';
  height: number | null = 0;
  weight: number | null = 0;
  age: number | null = 0;

  heightOptions = Array.from({ length: 131 }, (_, i) => i + 90); // 90 to 220 cm
  weightOptions = Array.from({ length: 156 }, (_, i) => i + 25); // 25 to 180 kg
  ageOptions = Array.from({ length: 88 }, (_, i) => i + 12); // 12 to 99 years

  openModal(event: MouseEvent) {
    event.preventDefault();
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.resetFields();
  }

  resetFields() {
    this.name = '';
    this.gender = '';
    this.height = 0;
    this.weight = 0;
    this.age = 0;
  }
}
