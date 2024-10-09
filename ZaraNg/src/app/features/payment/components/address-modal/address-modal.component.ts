import { Component, Input } from '@angular/core';

@Component({
  selector: 'address-modal',
  standalone: true,
  imports: [],
  templateUrl: './address-modal.component.html',
  styleUrl: './address-modal.component.css'
})
export class AddressModalComponent {
  isAddressModalOpen: boolean = false;

  openModal(event: MouseEvent) {
    event.preventDefault();
    this.isAddressModalOpen = true;
  }

  closeModal() {
    this.isAddressModalOpen = false;
  }
}
