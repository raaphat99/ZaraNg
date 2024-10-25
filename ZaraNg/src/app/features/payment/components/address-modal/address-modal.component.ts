import { CommonModule } from '@angular/common';
import { Address } from '../../../user/viewmodels/address';
import { UserAddressDTO, UserAddressesService } from './../../../user/services/user-addresses.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'address-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address-modal.component.html',
  styleUrl: './address-modal.component.css'
})
export class AddressModalComponent implements OnInit {
  isAddressModalOpen: boolean = false;
  addresses: UserAddressDTO[] = [];

  constructor(private userAddressService: UserAddressesService, private router: Router) {}

  ngOnInit(): void {
    this.userAddressService.GetUserAddresses().subscribe({
      next: (data: UserAddressDTO[]) => this.addresses = data,
      error: (error: Error) => console.log(`Error fetching addresses ${error}`),
    });
  }

  navigateToUpdateAddress(address: UserAddressDTO) {
    this.router.navigate([`user/profile/:id/update-address/${address.id}`]);
  }

  navigateToCreateAddress() {
    this.router.navigate([`user/profile/:id/add-address`]);
  }

  openModal(event: MouseEvent) {
    event.preventDefault();
    this.isAddressModalOpen = true;
  }

  closeModal() {
    this.isAddressModalOpen = false;
  }
}
