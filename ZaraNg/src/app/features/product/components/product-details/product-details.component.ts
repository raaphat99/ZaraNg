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
import { WishlistService } from '../../../shopping/wishlist/services/wishlist.service';
import { CategoryService } from '../../../category/services/category.service';
import { ProductVariantService } from '../../services/product-variant.service';
import { variantSize } from '../../viewmodels/variant-size';
import { UserMeasurement } from '../../viewmodels/user-measurement';
import { UserMeasurementService } from '../../services/user-measurement.service';

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
  mainProduct?: Product = {} as Product;
  availableColors: string[] = [];
  filteredImages: ProductImage[] = []; // Images to display based on selected color
  selectedColor: string | null = null; // Currently selected color
  sizes: string[] = []; // List of all possible sizes
  availableSize: string = '';
  selectedSize: string | null = null;
  @ViewChild(WishlistNotificationComponent)
  notificationComponent!: WishlistNotificationComponent;
  showModal: boolean = false;
  variantId!: number;
  isAdding: boolean = false;
  showCartModal: boolean = false;
  hasBeautyAncestor: boolean = false;
  userMeasurements: UserMeasurement[] = [];
  lastActiveMeasurement: UserMeasurement | null = null;
  hasMeasurements: boolean = false;
  sizeValue: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private categoryService: CategoryService,
    private variantService: ProductVariantService,
    private userMeasurementService: UserMeasurementService
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.getMainProduct();
    this.loadProductVariants();
    this.getAvailableColors();
    this.getCurrentVariant();
    this.getSizesByVariantId(this.variantId);
    this.getUserMeasurements();
  }


  getUserMeasurements(): void {
    this.userMeasurementService.getUserMeasurements().subscribe({
      next: (data: UserMeasurement[]) => {
        this.userMeasurements = data;
        this.hasMeasurements = data.length > 0;
        this.lastActiveMeasurement =
          this.findLastActiveMeasurement() ??
          this.userMeasurements[this.userMeasurements.length - 1];
      },
    });
  }

  findLastActiveMeasurement(): UserMeasurement | null {
    const activeMeasurements = this.userMeasurements.filter(
      (measurement) => measurement.active
    );
    return activeMeasurements.length > 0
      ? activeMeasurements[activeMeasurements.length - 1]
      : null;
  }

  getSizesByVariantId(variantId: number) {
    this.variantService.getSizesByVariantId(variantId).subscribe({
      next: (size: variantSize[]) => {
        this.availableSize = size[0].stringifiedValue;
      },
      error: (error) => {
        console.error('Error fetching sizes:', error);
      },
    });
  }

  isOrHasBeautyAncestor(categoryId: number) {
    this.categoryService.hasBeautyAncestor(categoryId).subscribe((result) => {
      this.hasBeautyAncestor = result;
    });
  }

  getCurrentVariant() {
    this.route.queryParams.subscribe((params) => {
      this.variantId = +params['variantId']; // Get the variantId from the URL
    });
  }

  addToCart(event: Event) {
    const element = event.target as HTMLElement;

    if (!element.classList.contains('disable-btn')) {
      if (!this.selectedSize && !this.hasBeautyAncestor) {
        this.showModal = true; // Show modal if size is not selected
      } else {
        this.isAdding = true;
        setTimeout(() => {
          this.cartService.addCartItem(this.variantId).subscribe({
            next: (response: any) => {
              // console.log('This item is successfully added to your cart.');
              this.isAdding = false;
              this.showCartModal = true;
            },
            error: (error: any) => console.log(error),
          });

          setTimeout(() => {
            this.showCartModal = false;
          }, 5000);
        }, 1500);
      }
    }
  }

  goToCart() {
    this.router.navigate(['shop/cart']);
    this.closeModal();
  }

  closeCartModal(): void {
    this.showCartModal = false;
  }

  closeModal() {
    this.showModal = false;
  }

  closeAllModals() {
    this.closeCartModal();
    this.closeModal();
  }

  initializeSizes(sizeType: string) {
    this.sizes = this.productService.getSizesBySizeType(sizeType);
  }

  isSizeAvailable(size: string): boolean {
    return this.availableSize === size;
  }

  onSizeClick(event: MouseEvent, size: string): void {
    const element = (event.target as HTMLElement).closest('li.size-item');

    if (!element) return; // Ensure the event is from a size-item element

    this.resetSizes();

    if (this.isSizeAvailable(size)) {
      this.selectedSize = size; // Store the selected size in the component's state

      // Add 'active' class to the clicked item
      element.classList.add('active');
    }
  }

  resetSizes() {
    // Remove 'active' class from all size items using Angular's bindings
    const sizeItems = document.querySelectorAll('.size-item');
    sizeItems.forEach((item) => item.classList.remove('active'));
    this.selectedSize = null;
  }

  getMainProduct(): void {
    this.productService.getByID(this.productId).subscribe({
      next: (data: any) => {
        this.mainProduct = data;
        if (this.mainProduct?.categoryId !== undefined) {
          this.isOrHasBeautyAncestor(this.mainProduct.categoryId);
        }
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

        // this.extractAvailableSizes();

        // Set the default color to the first available color
        if (this.availableColors.length > 0) {
          this.selectedColor = this.availableColors[0]; // Set default color
          this.loadImagesByColor(this.selectedColor); // Load images for default color
        }
      });
  }

  // extractAvailableSizes(): void {
  //   const sizes = this.productVariants.map((variant) => variant.sizeName);
  //   this.availableSizes = [...new Set(sizes)]; // Get distinct sizes
  //   // console.log(this.availableSizes);
  // }

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
    this.resetSizes();
    this.selectedColor = color;
    this.loadImagesByColor(color); // Load images for the clicked color
    this.getSizesByVariantId(this.variantId);
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
      top: index * 447, // Scroll to the position of the selected image
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
