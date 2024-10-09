import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  @ViewChild('scrollGallery', { static: true }) scrollGallery!: ElementRef;
  isExpanded = false;
  activeIndex = 0;
  isBookmarked: boolean = false;
  isStoreSizesModalOpen = false; 
  isFindSizeModalOpen = false;

  images = [
    'https://picsum.photos/id/10/300/400',
    'https://picsum.photos/id/12/300/400',
    'https://picsum.photos/id/16/300/400',
    'https://picsum.photos/id/24/300/400',
    'https://picsum.photos/id/40/300/400',
    'https://picsum.photos/id/62/300/400',
    'https://picsum.photos/id/126/300/400',
    'https://picsum.photos/id/115/300/400',
  ];

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
  }

  setActiveImage(index: number) {
    this.activeIndex = index; // Update the active index
    this.scrollGallery.nativeElement.scrollTo({
      top: index * 400, // Scroll to the position of the selected image
      behavior: 'smooth' // Smooth scroll behavior
    });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const galleryItems = this.scrollGallery.nativeElement.querySelectorAll('.gallery-item');

    galleryItems.forEach((item: HTMLImageElement, index: number) => {
      const rect = item.getBoundingClientRect();
      const viewHeight = this.scrollGallery.nativeElement.clientHeight;

      // Check if the item is in view
      if (rect.top >= 0 && rect.top < viewHeight) {
        this.activeIndex = index; // Update the active index based on scroll
      }
    });
  }

  toggleContent() {
    this.isExpanded = !this.isExpanded;
  }

  openStoreSizesModal(event: MouseEvent) {
    event.preventDefault();
    this.isStoreSizesModalOpen = true;
  }
}
