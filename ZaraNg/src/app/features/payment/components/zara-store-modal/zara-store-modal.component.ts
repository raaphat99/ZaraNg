import { afterNextRender, Component } from '@angular/core';
import { Store } from '../../viewmodels/Store';
import { StoreService } from '../../services/store.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'zara-store-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './zara-store-modal.component.html',
  styleUrl: './zara-store-modal.component.css',
})
export class ZaraStoreModalComponent {
  isZaraStoreModalOpen: boolean = false;
  stores: Store[] = [];
  searchForm = new FormGroup({
    searchQuery: new FormControl('')
  });
  selectedStore: string | null = null;

  constructor(private storeService: StoreService) {}

  get searchQuery() {
    return this.searchForm.get('searchQuery')?.value;
  }

  searchStores() {
    if (this.searchQuery) {
      this.storeService.filterStoresByLocation(this.searchQuery).subscribe({
        next: (data: Store[]) => (this.stores = data),
        error: (error) => console.error('Error fetching stores', error),
      });
    }
  }

  toggleModal(event: MouseEvent) {
    event.preventDefault();
    this.isZaraStoreModalOpen = !this.isZaraStoreModalOpen;
    this.searchForm.get('searchQuery')?.reset();
    this.stores = [];
  }

  saveSelection() {
    this.isZaraStoreModalOpen = false;
    
    if (this.selectedStore !== null) {
      console.log('Selected store:', this.selectedStore);
    } else {
      console.log('No store selected');
    }
  }
}
