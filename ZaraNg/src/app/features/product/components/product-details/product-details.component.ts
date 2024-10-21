import { CustomValidators } from './../../../../shared/custom-validators/custom-validators';
import { CartService } from '../../../shopping/cart/services/cart.service';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductVariant } from '../../viewmodels/product-variant';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../viewmodels/product';
import { ProductImage } from '../../viewmodels/product-image';
import { WishlistNotificationComponent } from '../../../../shared/components/wishlist-notification/wishlist-notification.component';
import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { WishlistService } from '../../../shopping/wishlist/services/wishlist.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('scrollGallery', { static: true }) scrollGallery!: ElementRef;
  isExpanded = false;
  activeIndex = 0;
  isBookmarked: boolean = false;
  isStoreSizesModalOpen = false;
  isFindSizeModalOpen = false;
  productVariants: ProductVariant[] = [];
  productId!: number;
  mainProduct?: Product;
  availableColors: string[] = [];
  filteredImages: ProductImage[] = []; // Images to display based on selected color
  selectedColor: string | null = null; // Currently selected color
  sizes: string[] = []; // List of all possible sizes
  availableSizes: string[] = [];
  selectedSize: string | null = null;
  @ViewChild(WishlistNotificationComponent)
  notificationComponent!: WishlistNotificationComponent;
  showModal: boolean = false;
  variantId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private wishlistService: WishlistService,
    private CartService: CartService
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.getMainProduct();
    this.loadProductVariants();
    this.getAvailableColors();
    this.getCurrentVariant();
  }

  getCurrentVariant() {
    this.route.queryParams.subscribe((params) => {
      this.variantId = +params['variantId']; // Get the variantId from the URL
    });
  }

  addToCart(event: Event) {
    const element = event.target as HTMLElement;
    if (!element.classList.contains('disable-btn')) {
      if (!this.selectedSize) {
        this.showModal = true; // Show modal if size is not selected
      } else {
        // Add the variant to the cart using the CartService
        this.CartService.addCartItem(this.variantId).subscribe({
          next: (response: any) =>
            console.log('This item is successfully added to your cart.'),
          error: (error: any) => console.log(error),
        });
      }
    }
  }

  closeModal() {
    this.showModal = false;
  }

  initializeSizes(sizeType: string) {
    this.sizes = this.productService.getSizesBySizeType(sizeType);
  }

  isSizeAvailable(size: string): boolean {
    return this.availableSizes.includes(size);
  }

  onSizeClick(event: MouseEvent, size: string): void {
    const element = (event.target as HTMLElement).closest('li.size-item');
    
    if (!element) return; // Ensure the event is from a size-item element
  
    if (this.isSizeAvailable(size)) {
      this.selectedSize = size; // Store the selected size in the component's state
      
      // Remove 'active' class from all size items using Angular's bindings
      const sizeItems = document.querySelectorAll('.size-item');
      sizeItems.forEach((item) => item.classList.remove('active'));
      
      // Add 'active' class to the clicked item
      element.classList.add('active');
    }
  }
  

  getMainProduct(): void {
    this.productService.getByID(this.productId).subscribe({
      next: (data: any) => {
        this.mainProduct = data;
        this.initializeSizes(data.sizeType);
        this.checkWishlistStatus();
      },
    });
  }

  loadProductVariants(): void {
    this.productService
      .getProductVariants(this.productId)
      .subscribe((data: any) => {
        this.productVariants = data;

        this.extractAvailableSizes();

        // Set the default color to the first available color
        if (this.availableColors.length > 0) {
          this.selectedColor = this.availableColors[0]; // Set default color
          this.loadImagesByColor(this.selectedColor); // Load images for default color
        }
      });
  }

  extractAvailableSizes(): void {
    const sizes = this.productVariants.map((variant) => variant.sizeName);
    this.availableSizes = [...new Set(sizes)]; // Get distinct sizes
    // console.log(this.availableSizes);
  }

  getAvailableColors(): void {
    this.productService.getProductColors(this.productId).subscribe({
      next: (colors: string[]) => {
        this.availableColors = colors;

        // After fetching colors, load images for the default color
        if (this.availableColors.length > 0) {
          this.selectedColor = this.availableColors[0]; // Set default color
          this.loadImagesByColor(this.selectedColor); // Load images for default color
        }
      },
    });
  }

  // Load images for the selected color
  loadImagesByColor(color: string): void {
    const selectedVariant = this.productVariants.find(
      (variant) => variant.productColor === color
    );

    if (selectedVariant) {
      // Add variantId to the URL as a query parameter
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { variantId: selectedVariant.id },
        queryParamsHandling: 'merge', // Keep other query parameters if any
      });

      this.productService.getVariantImages(selectedVariant.id).subscribe({
        next: (images: ProductImage[]) => (this.filteredImages = images),
      });
    } else {
      this.filteredImages = [];
    }
  }

  // Filter images based on the selected color
  onColorClick(color: string): void {
    this.selectedColor = color;
    this.loadImagesByColor(color); // Load images for the clicked color
  }

  // getSizes() : void {
  //   this.getMainProduct();
  //   this.productService.getSizesBySizeType()
  //     .subscribe({
  //       next: (sizes: string[]) => this.sizes = sizes,
  //     })
  // }

  toggleBookmark(): void {
    let productId = this.mainProduct!.id;

    if (this.isBookmarked) {
      this.wishlistService.removeFromWishlist(productId).subscribe({
        next: () => {
          this.isBookmarked = false;
          this.notificationComponent.showNotification(
            'The item has been removed from favourites.'
          );
        },
        error: (error) =>
          console.error('Error removing product from wishlist', error),
      });
    } else {
      this.wishlistService.addProductToWishlist(productId).subscribe({
        next: () => {
          this.isBookmarked = true;
          this.notificationComponent.showNotification('Saved.');
        },
        error: (error) =>
          console.error('Error adding product to wishlist', error),
      });
    }
  }

  checkWishlistStatus(): void {
    const productId = this.mainProduct!.id;

    // Call a service method to check if the product is in the user's wishlist
    this.wishlistService.isInWishlist(productId).subscribe({
      next: (isInWishlist) => {
        this.isBookmarked = isInWishlist;
      },
      error: (error) => {
        console.error('Error checking wishlist status', error);
      },
    });
  }

  setActiveImage(index: number) {
    this.activeIndex = index; // Update the active index
    this.scrollGallery.nativeElement.scrollTo({
      top: index * 400, // Scroll to the position of the selected image
      behavior: 'smooth', // Smooth scroll behavior
    });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const galleryItems =
      this.scrollGallery.nativeElement.querySelectorAll('.gallery-item');

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
