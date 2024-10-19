import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../features/shopping/cart/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ElementRef, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { HambergermenueService } from '../../../features/category/services/hambergermenue.service';
import { CategoryService } from '../../../features/category/services/category.service';
import { Category } from '../viewmodels/Category';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  itemCount: number = 0;
  userName: string | null = null;
  isAdmin: boolean = false;
  open: boolean = false;
  mainCategories: Category[] = [];
  selectitem: Category[] = [];
  selectedCategory2: string | null = null;
  subcat: Category[] = [];
  subproduct: Category[] = [];
  selectedCategoryId: number = 2;
  isMenuOpen: boolean = false; 
  cat: Map<number, string> = new Map([
    [0, 'WOMAN'],
    [1, 'MAN'],
    [2, 'KIDS'],
    [3, 'BEAUTY'],
  ]);

  constructor(
    private authService: AuthService,
    public categoryService: CategoryService,
    private eRef: ElementRef,
    private router: Router,
    private cartService: CartService
  ) {
    const role = this.authService.getUserRole();
    console.log(`Current user role: ${role}`);
    this.isAdmin = role === 'Admin';
    console.log(`User role: ${role}`);

    categoryService.getAll().subscribe({
      next: (a) => {
        console.log(a);
        this.mainCategories = a;
        console.log(this.mainCategories);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  ngOnInit(): void {
    this.checkLoginStatus();
    this.cartService.getItemCount().subscribe(
      (count) => {
        this.itemCount = count;
      },
      (error) => {
        console.error('Error fetching cart item count:', error);
      }
    );
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.mainCategories = categories;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  checkLoginStatus(): void {
    this.userName = this.authService.getUserName();
  }

  onMenuButtonClick() {
    this.isMenuOpen = !this.isMenuOpen; 

    this.open = !this.open;

    if (this.open && this.mainCategories.length > 0) {
      for (let index = 0; index < this.mainCategories.length; index++) {
        this.clicked(this.mainCategories[0].id);
      }
    }
    this.categoryService.url =
      'http://localhost:5250/api/Category/main-categories';
    this.categoryService.getAll().subscribe({
      next: (a) => {
        console.log(a);
        this.mainCategories = a;
        console.log('hello' + this.mainCategories);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.categoryService.getAll().subscribe({
      next: (a) => {
        console.log(a);
        this.mainCategories = a;
        console.log(this.mainCategories);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  clicked(id: number = 2) {
    this.mainCategories.forEach((category) => (category.clicked = false));
    let selectedCategory = this.mainCategories.find(
      (category) => category.id === id
    );
    if (selectedCategory) {
      selectedCategory.clicked = true;
      this.selectedCategoryId = selectedCategory.id;

      this.selectitem = this.mainCategories.filter(
        (category) => category.parentCategoryId === id
      );

      this.categoryService.url =
        'http://localhost:5250/api/Category/' +
        this.selectedCategoryId +
        '/subcategories';

      this.categoryService.getSub().subscribe({
        next: (a) => {
          this.selectitem = a;
          console.log(this.selectitem);
          this.selectedCategoryId = id;
        },
        error: (err) => {
          console.error('Error fetching categories:', err);
        },
      });
    }
  }

  checkAndCallSubcat(name: string, ID: number) {
    this.selectedCategory2 = name;
    this.subcat = [];
    this.subproduct = [];
    this.categoryService.url = '';

    console.log('Selected Category: ' + name);
    console.log('ID: ' + ID);

    if (
      name === 'WOMAN' ||
      name === 'MAN' ||
      name === 'KIDS' ||
      name === 'Girls' ||
      name === 'Boys'
    ) {
      this.categoryService.url =
        'http://localhost:5250/api/Category/' + ID + '/subcategories';
    } else {
      this.categoryService.url =
        'http://localhost:5250/api/products/category/' + ID;
    }
    if (this.categoryService.url !== '') {
      this.categoryService.getSub().subscribe({
        next: (data) => {
          if (
            name === 'WOMAN' ||
            name === 'MAN' ||
            name === 'KIDS' ||
            name === 'Girls' ||
            name === 'Boys'
          ) {
            this.subcat = data;
            console.log('Subcategories: ', this.subcat);
          } else {
            this.subproduct = data;
            console.log('Products: ', this.subproduct);
          }
          if (this.subproduct.length > 0) {
            this.router.navigate(['productfilter'], {
              queryParams: { products: JSON.stringify(this.subproduct) },
            });
            this.open = !this.open;
          } else {
            console.log('No products found for this subcategory.');
          }
        },
        error: (err) => {
          console.error('Error fetching data:', err);
        },
      });
    } else {
      console.log('Invalid URL or missing category.');
    }
  }
  navigateToSubcatProducts(subcatId: number) {
    const productUrl =
      'http://localhost:5250/api/products/category/' + subcatId;

    this.categoryService.url = productUrl;

    this.categoryService.getSub().subscribe({
      next: (data) => {
        this.subproduct = data;
        console.log(
          'Products for Subcategory ID ' + subcatId + ': ',
          this.subproduct
        );

        if (this.subproduct.length > 0) {
          console.log('Navigating with products: ', this.subproduct); // تأكد من عرض المنتجات هنا
          this.router.navigate(['productfilter'], {
            queryParams: { products: JSON.stringify(this.subproduct) },
          });
        } else {
          console.log('No products found for this subcategory.');
        }
      },
      error: (err) => {
        console.error('Error fetching products for subcategory:', err);
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
  styleProductIdMap: { [key: string]: number[] } = {
    BLAZERS: [13, 51],
    WAISTCOATS: [13],
    DRESSES: [14],
    TOPS: [15],
    BODYSUITS: [15],
    'T-SHIRTS': [16, 46],
    SHIRTS: [17, 47],
    TROUSERS: [18, 42],
    JEANS: [19, 43],
    SKIRTS: [20],
    SHORTS: [20],
    OUTERWEAR: [21],
    CARDIGANS: [22, 41],
    SWEATERS: [22, 41],
    KNITWEAR: [23],
    SWEATSHIRTS: [24, 45],
    JOGGERS: [24],
    SHOES: [25, 53],
    BAGS: [27, 53],
    ACCESSORIES: [28, 54],
    JEWELLERY: [28],
    PERFUMES: [29, 55, 62],
    SUITS: [30, 48],
    'CO-ORD SETS': [32],
    BASICS: [33],
    'SPECIAL PRICE': [34, 56],
    BESTSELLERS: [36],
    LEATHER: [37],
    JACKETS: [38],
    GILETS: [38],
    COATS: [39],
    'TRENCH COATS': [39],
    PUFFERS: [40],
    CARGO: [44],
    HOODIES: [45],
    TRACKSUITS: [36, 49],
    OVERSHIRTS: [37, 50],
    'POLO SHIRTS': [38, 52],
    MAKEUP: [40],
  };
}
