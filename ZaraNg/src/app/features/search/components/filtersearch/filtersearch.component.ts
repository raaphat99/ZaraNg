import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '../../../productfilter/services/filter.service';
import { ColorsearchComponent } from '../colorsearch/colorsearch.component';

@Component({
  selector: 'app-filtersearch',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent, ColorsearchComponent],
  templateUrl: './filtersearch.component.html',
  styleUrls: ['./filtersearch.component.css']
})
export class FiltersearchComponent implements OnInit {
  category: string[] = ['WOMAN', 'MAN', 'KIDS'];
  categoryId: number[] = [2, 3, 4];
  styleProductIdMap: { [key: string]: number[] } = {
    'BLAZERS': [13, 51],
    'WAISTCOATS': [13],
    'DRESSES': [14],
    'TOPS': [15],
    'BODYSUITS': [15],
    'T-SHIRTS': [16, 46],
    'SHIRTS': [17, 47],
    'TROUSERS': [18, 42],
    'JEANS': [19, 43],
    'SKIRTS': [20],
    'SHORTS': [20],
    'OUTERWEAR': [21],
    'CARDIGANS': [22, 41],
    'SWEATERS': [22, 41],
    'KNITWEAR': [23],
    'SWEATSHIRTS': [24, 45],
    'JOGGERS': [24],
    'SHOES': [25, 53],
    'BAGS': [27, 53],
    'ACCESSORIES': [28, 54],
    'JEWELLERY': [28],
    'PERFUMES': [29, 55, 62],
    'SUITS': [30, 48],
    'CO-ORD SETS': [32],
    'BASICS': [33],
    'SPECIAL PRICE': [34, 56],
    'BESTSELLERS': [36],
    'LEATHER': [37],
    'JACKETS': [38],
    'GILETS': [38],
    'COATS': [39],
    'TRENCH COATS': [39],
    'PUFFERS': [40],
    'CARGO': [44],
    'HOODIES': [45],
    'TRACKSUITS': [36, 49],
    'OVERSHIRTS': [37, 50],
    'POLO SHIRTS': [38, 52],
    'MAKEUP': [40]
  };

  colors: { name: string, hsl: string }[] = [
    { name: 'ANIMAL PRINT', hsl: 'hsl(30, 70%, 50%)' },
    { name: 'Beige', hsl: 'hsl(60, 60%, 80%)' },
    { name: 'Black', hsl: 'hsl(0, 0%, 0%)' },
    { name: 'Blue', hsl: 'hsl(210, 100%, 50%)' },
    { name: 'Brown', hsl: 'hsl(30, 60%, 40%)' },
    { name: 'Burgundy', hsl: 'hsl(0, 100%, 25%)' },
    { name: 'Golden', hsl: 'hsl(45, 100%, 50%)' },
    { name: 'White', hsl: 'hsl(0, 0%, 100%)' },
    { name: 'Green', hsl: 'hsl(120, 100%, 40%)' },
    { name: 'Grey', hsl: 'hsl(0, 0%, 70%)' },
    { name: 'Khaki', hsl: 'hsl(60, 30%, 50%)' },
    { name: 'Metallic', hsl: 'hsl(0, 0%, 50%)' },
    { name: 'Neon', hsl: 'hsl(120, 100%, 50%)' },
    { name: 'Orange', hsl: 'hsl(30, 100%, 50%)' },
    { name: 'Pink', hsl: 'hsl(330, 100%, 50%)' },
    { name: 'Printed', hsl: 'hsl(0, 0%, 60%)' },
    { name: 'Purple', hsl: 'hsl(270, 100%, 50%)' },
    { name: 'Red', hsl: 'hsl(0, 100%, 50%)' },
    { name: 'Silver', hsl: 'hsl(0, 0%, 75%)' },
    { name: 'Tan', hsl: 'hsl(30, 40%, 70%)' },
    { name: 'Yellow', hsl: 'hsl(60, 100%, 50%)' },
  ];
  searchQuery: string = '';
  products: Productsearch[] = [];
  selectedCategory: string | null = null;

  selectCategory(item: string): void {
    this.selectedCategory = item;
    console.log('Selected Category:', this.selectedCategory);
  }
  // Define variables to hold products for different categories
  productForWomen: Productsearch[] = [];
  productForMen: Productsearch[] = [];
  productForKids: Productsearch[] = [];

  @Output() colorsSelected: EventEmitter<{ colors: string[], categoryId: number[] }> = new EventEmitter();

  constructor(private route: ActivatedRoute, private filter: FilterService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] ? params['query'].toUpperCase() : '';
      console.log('Search Query:', this.searchQuery);

      if (this.searchQuery) {
        this.fetchProductsByKeyword(this.searchQuery);
      } else {
        this.fetchDefaultProducts();
      }
    });
  }

  public fetchDefaultProducts(): void {
    const defaultCategory = this.category[0];
    this.fetchProductsByCategory(defaultCategory);
  }

  public fetchProductsByCategory(category: string): void {
    const productIds = this.styleProductIdMap[category];
    if (productIds) {
      productIds.forEach(id => {
        const url = `http://localhost:5250/api/Products/category/${id}`;
        console.log('Fetching URL for ID:', url);
        this.fetchProducts(url, category);
      });
    } else {
      console.warn(`No product IDs found for category: ${category}`);
    }
  }
  fetchProductsByKeyword(keyword: string): void {
    const words = keyword.split(' ');
    const matchingCategories: string[] = [];
    const matchingColors: string[] = [];
    const selectedCategoryIds: number[] = []; // مصفوفة جديدة لتخزين المعرفات

    // البحث عن الفئات المتطابقة
    words.forEach(word => {
        const categories = Object.keys(this.styleProductIdMap).filter(cat =>
            cat.toUpperCase().includes(word.toUpperCase())
        );
        matchingCategories.push(...categories);
    });

    // تحديث selectedCategoryIds بناءً على matchingCategories
    matchingCategories.forEach(category => {
        if (this.styleProductIdMap[category]) {
            selectedCategoryIds.push(...this.styleProductIdMap[category]);
        }
    });

    // تحديث selectedCategoryId
    this.selectedCategoryId = selectedCategoryIds;
    this.selectedColors = words.filter(word =>
      this.colors.some(color => color.name.toUpperCase() === word.toUpperCase())
    );
    console.log('Selected Colors:', this.selectedColors);

    // البحث عن الألوان المتطابقة
    words.forEach(word => {
        const colorMatch = this.colors.find(color =>
            color.name.toUpperCase() === word.toUpperCase()
        );
        if (colorMatch) {
            matchingColors.push(colorMatch.name);
        }
    });

    if (matchingCategories.length > 0) {
      matchingCategories.forEach(category => {
        this.fetchProductsByCategory(category);
      });
    } else if (this.selectedColors.length > 0) {
      let styleKey = this.selectedCategory || 'BLAZERS'; // Default style key
      this.sendToColorSearchComponent(this.selectedColors, styleKey);
    } else {
      console.warn(`No matching categories or colors found for keywords: ${keyword}`);
    }
        if (matchingCategories.length > 0) {
        matchingCategories.forEach(category => {
            this.fetchProductsByCategory(category);
        });
    } else if (matchingColors.length > 0) {
        let styleKey = this.selectedCategory || 'BLAZERS'; // استخدم قيمة محددة إذا لم يكن هناك فئة محددة
        this.sendToColorSearchComponent(matchingColors, styleKey);
    } else {
        console.warn(`No matching categories found for keywords: ${keyword}`);
    }

    // سجل معلومات التصحيح
    console.log('Matching Categories:', matchingCategories);
    console.log('Matching color:', matchingColors);

    console.log('Selected Category IDs:', this.selectedCategoryId);
}


  
    selectedColors: string[] = [];
    selectedCategoryId: number[] = [];
    
    sendToColorSearchComponent(colors: string[], styleKey: string): void {
      // هنا نتأكد إذا كانت الكلمة لونًا ونجمع أول 5 categoryId
      if (colors.length > 0 && this.styleProductIdMap[styleKey]) {
        const firstFiveCategoryIds = this.styleProductIdMap[styleKey].slice(0, 5); // أخذ أول 5 أرقام من المفتاح المحدد
        console.log('Sending colors to colorsearch component with category IDs:', colors, firstFiveCategoryIds);
        
        // Emit the colors and first 5 category IDs to the colorsearch component
        this.colorsSelected.emit({ colors, categoryId: firstFiveCategoryIds });
        
        // تحديث selectedCategoryId
        this.selectedCategoryId = firstFiveCategoryIds; // تحديث المعرفات المختارة
      } else {
        console.log('Style key not found or invalid.');
      }
    }
    
    get colorAndCategory() {
      console.log("selectedColors: ", this.selectedColors, ' | selectedCategoryId: ', this.selectedCategoryId);
      return { colors: this.selectedColors, categoryId: this.selectedCategoryId };
    }
      

  fetchProducts(url: string, category: string): void {
    this.filter.url = url;

    this.filter.getAll().subscribe({
      next: (data: any[]) => {
        const products: Productsearch[] = data.map(item => new Productsearch(
          item.id, item.name, item.price, item.stockQuantity, item.categoryId,
          item.productId, item.sizeId, item.sizeValue, item.productColor,
          item.productMaterial, item.created, item.updated, item.description, item.mainImageUrl, item.filterName
        ));

        if (Array.isArray(products)) {
          products.forEach(product => {
            Object.keys(this.styleProductIdMap).forEach(categoryKey => {
              const categoryIds = this.styleProductIdMap[categoryKey];

              if (categoryIds.includes(product.categoryId)) {
                const index = categoryIds.indexOf(product.categoryId);
                if (!this.selectedCategoryId.includes(product.categoryId)) {
                  this.selectedCategoryId.push(product.categoryId); // إضافة الفئة إذا لم تكن موجودة
                }
                console.log("firsttttttttttttttttt"+this.selectedCategoryId);

                if (index === 0 && !this.productForWomen.some(p => p.id === product.id)) {
                  this.productForWomen.push(product);
                  if (!this.selectedCategoryId.includes(product.categoryId)) {
                    this.selectedCategoryId.push(product.categoryId); // إضافة الفئة إذا لم تكن موجودة
                  }
                  console.log("first"+this.selectedCategoryId);


                } else if (index === 1 && !this.productForMen.some(p => p.id === product.id)) {
                  this.productForMen.push(product);
                  if (!this.selectedCategoryId.includes(product.categoryId)) {
                    this.selectedCategoryId.push(product.categoryId); // إضافة الفئة إذا لم تكن موجودة
                  }
                  console.log("secand"+this.selectedCategoryId);


                } else if (index === 2 && !this.productForKids.some(p => p.id === product.id)) {
                  this.productForKids.push(product);
                  if (!this.selectedCategoryId.includes(product.categoryId)) {
                    this.selectedCategoryId.push(product.categoryId); // إضافة الفئة إذا لم تكن موجودة
                  }                  console.log("third"+this.selectedCategoryId);

                }
              }
              
              if (!this.selectedCategoryId.includes(product.categoryId)) {
                this.selectedCategoryId.push(product.categoryId); // إضافة الفئة إذا لم تكن موجودة
              }
                            console.log("forth"+this.selectedCategoryId);

            });
          });
        }

        this.logProducts();
      },
      error: err => {
        console.error('Error fetching products for selected style:', err);
      }
    });
  }

  private logProducts() {
    console.log("Products for Women:", this.productForWomen);
    console.log("Products for Men:", this.productForMen);
    console.log("Products for Kids:", this.productForKids);
  }

}

class Productsearch {
  constructor(
    public id: number,
    public productName: string,
    public price: number,
    public stockQuantity: number,
    public categoryId: number,
    public productId?: number,
    public sizeId?: number,
    public sizeValue?: string,
    public productColor?: number,
    public productMaterial?: number,
    public created?: string,
    public updated?: string,
    public description?: string,
    public mainImageUrl?: string,
    public filterName?: string[]
  ) {}
}
