// import { CommonModule } from "@angular/common";
// import { Component, OnInit, Output, EventEmitter } from "@angular/core";
// import { FormsModule } from "@angular/forms";
// import { ActivatedRoute } from "@angular/router";
// import { FooterComponent } from "../../../../shared/components/footer/footer.component";
// import { HeaderComponent } from "../../../../shared/components/header/header.component";
// import { ProductModule } from "../../../product/product.module";
// import { Product2 } from "../../../productfilter/components/productfilter/productfilter.component";
// import { FilterService } from "../../../productfilter/services/filter.service";
// import { ColorsearchComponent } from "../colorsearch/colorsearch.component";


// @Component({
//   selector: 'app-filtersearch',
//   standalone: true,
//   imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent, ColorsearchComponent, ProductModule],
//   templateUrl: './filtersearch.component.html',
//   styleUrls: ['./filtersearch.component.css']
// })
// export class FiltersearchComponent implements OnInit {
//   category: string[] = ['WOMAN', 'MAN'];
//   categoryId: number[] = [2, 3];
//   styleProductIdMap: { [key: string]: number[]; } = {
//     'BLAZERS': [13, 51],
//     'WAISTCOATS': [13],
//     'DRESSES': [14],
//     'TOPS': [15],
//     'BODYSUITS': [15],
//     'T-SHIRTS': [16, 46],
//     'SHIRTS': [17, 47],
//     'TROUSERS': [18, 42],
//     'JEANS': [19, 43],
//     'SKIRTS': [20],
//     'SHORTS': [20],
//     'OUTERWEAR': [21],
//     'CARDIGANS': [22, 41],
//     'SWEATERS': [22, 41],
//     'KNITWEAR': [23],
//     'SWEATSHIRTS': [24, 45],
//     'JOGGERS': [24],
//     'SHOES': [25, 53],
//     'BAGS': [27, 53],
//     'ACCESSORIES': [28, 54],
//     'JEWELLERY': [28],
//     'PERFUMES': [29, 55],
//     'SUITS': [30, 48],
//     'CO-ORD SETS': [32],
//     'BASICS': [33],
//     'SPECIAL PRICE': [34, 56],
//     'BESTSELLERS': [36],
//     'LEATHER': [37],
//     'JACKETS': [0,38],
//     'GILETS': [38],
//     'COATS': [39],
//     'TRENCH COATS': [39],
//     'PUFFERS': [40],
//     'CARGO': [44],
//     'HOODIES': [45],
//     'TRACKSUITS': [36, 49],
//     'OVERSHIRTS': [37, 50],
//     'POLO SHIRTS': [38, 52],
//     'MAKEUP': [40]
//   };

//   colors: { name: string; hsl: string; }[] = [
//     { name: 'ANIMAL PRINT', hsl: 'hsl(30, 70%, 50%)' },
//     { name: 'Beige', hsl: 'hsl(60, 60%, 80%)' },
//     { name: 'Black', hsl: 'hsl(0, 0%, 0%)' },
//     { name: 'Blue', hsl: 'hsl(210, 100%, 50%)' },
//     { name: 'Brown', hsl: 'hsl(30, 60%, 40%)' },
//     { name: 'Burgundy', hsl: 'hsl(0, 100%, 25%)' },
//     { name: 'Golden', hsl: 'hsl(45, 100%, 50%)' },
//     { name: 'White', hsl: 'hsl(0, 0%, 100%)' },
//     { name: 'Green', hsl: 'hsl(120, 100%, 40%)' },
//     { name: 'Grey', hsl: 'hsl(0, 0%, 70%)' },
//     { name: 'Khaki', hsl: 'hsl(60, 30%, 50%)' },
//     { name: 'Metallic', hsl: 'hsl(0, 0%, 50%)' },
//     { name: 'Neon', hsl: 'hsl(120, 100%, 50%)' },
//     { name: 'Orange', hsl: 'hsl(30, 100%, 50%)' },
//     { name: 'Pink', hsl: 'hsl(330, 100%, 50%)' },
//     { name: 'Printed', hsl: 'hsl(0, 0%, 60%)' },
//     { name: 'Purple', hsl: 'hsl(270, 100%, 50%)' },
//     { name: 'Red', hsl: 'hsl(0, 100%, 50%)' },
//     { name: 'Silver', hsl: 'hsl(0, 0%, 75%)' },
//     { name: 'Tan', hsl: 'hsl(30, 40%, 70%)' },
//     { name: 'Yellow', hsl: 'hsl(60, 100%, 50%)' },
//   ];
//   searchQuery: string = '';
// products: Productsearch[] = [];
// selectedCategory: string | null = null;

// selectCategory(item: string): void {
//   this.selectedCategory = item;
//   this.getproduct();
//   console.log('Selected Category:', this.selectedCategory);
// }

// // Define variables to hold products for different categories
// productForWomen: Productsearch[] = [];
// productForMen: Productsearch[] = [];
// productForKids: Productsearch[] = [];

// @Output() colorsSelected: EventEmitter<{ colors: string[]; categoryId: number[]; }> = new EventEmitter();

// constructor(private route: ActivatedRoute, private filter: FilterService) { }

// ngOnInit(): void {
//   this.route.queryParams.subscribe(params => {
//     this.searchQuery = params['query'] ? params['query'].toUpperCase() : '';
//     console.log('Search Query:', this.searchQuery);

//     if (this.searchQuery) {
//       this.fetchProductsByKeyword(this.searchQuery);
//     } else {
//       this.fetchDefaultProducts();
//     }
//   });
// }

// public fetchDefaultProducts(): void {
//   const defaultCategory = this.category[0];
//   this.fetchProductsByCategory(defaultCategory);
// }

// fetchedCategories: Set<string> = new Set(); // تعريف المتغير كمجموعة

// public fetchProductsByCategory(category: string): void {
//   const productIds = this.styleProductIdMap[category];
//   console.log('Product IDs for category:', category, productIds); // سجل معرفات المنتجات للفئة

//   if (productIds && productIds.length > 0) { // تحقق إذا كانت المعرفات موجودة
//     productIds.forEach(id => {
//       const url = `http://localhost:5250/api/Products/category/${id}`;
//       console.log('Fetching URL for ID:', url); // سجل URL للطلب
//       this.fetchProducts(url, category);
//     });
//   } else {
//     console.warn(`No product IDs found for category: ${category}`);
//   }
// }

// fetchProductsByKeyword(keyword: string): void {
//   const words = keyword.split(' ');
//   const matchingCategories: Set<string> = new Set(); 
//   const matchingColors: string[] = [];
//   const selectedCategoryIds: number[] = []; 

//   // البحث عن الفئات المتطابقة
//   words.forEach(word => {
//       const categories = Object.keys(this.styleProductIdMap).filter(cat => 
//           cat.toUpperCase().includes(word.toUpperCase())
//       );
//       categories.forEach(cat => matchingCategories.add(cat)); 
//   });

//   // استخراج أول قيمة من matchingCategories
//   const firstCategory = Array.from(matchingCategories.values())[0];
//   console.log('First Matching Category:', firstCategory); // طباعة أول فئة متطابقة

//   // إذا كان لديك منطق آخر للعمل مع firstCategory، يمكنك استخدامه هنا
//   if (firstCategory) {
//       // استخدام firstCategory حسب الحاجة
//       console.log('Fetching products for first category:', firstCategory);
//       this.fetchProductsByCategory(firstCategory);
//       this.fetchedCategories.add(firstCategory);
//   } else {
//       console.warn(`No matching categories found for keywords: ${keyword}`);
//   }

//   // Handle color matches (بقية الكود يبقى كما هو)
//   // ...
//   words.forEach(word => {
//     const colorMatch = this.colors.find(color => color.name.toUpperCase() === word.toUpperCase());
//     if (colorMatch) {
//       matchingColors.push(colorMatch.name);
//     }
//   });
//   if (matchingColors.length > 0) {
//     let styleKey = firstCategory || 'BLAZERS'; 

//     this.sendToColorSearchComponent(matchingColors, styleKey);
// }
//   // سجل معلومات التصحيح
//   console.log('Matching Categories:', Array.from(matchingCategories));
//   console.log('Matching Colors:', matchingColors);
//   console.log('Selected Category IDs:', this.selectedCategoryId);
// }



// selectedColors: string[] = [];
// selectedCategoryId: number[] = [];

// sendToColorSearchComponent(colors: string[], styleKey: string): void {
//   if (colors.length > 0 && this.styleProductIdMap[styleKey]) {
//     const firstFiveCategoryIds = this.styleProductIdMap[styleKey].slice(0, 5); // أخذ أول 5 أرقام من المفتاح المحدد
//     console.log('Sending colors to colorsearch component with category IDs:', colors, firstFiveCategoryIds);

//     // Emit the colors and first 5 category IDs to the colorsearch component
//     this.colorsSelected.emit({ colors, categoryId: firstFiveCategoryIds });
//     this.selectedColors=colors;
//     // تحديث selectedCategoryId
//    // this.selectedCategoryId=[];
//     this.selectedCategoryId = firstFiveCategoryIds; // تحديث المعرفات المختارة
//   } else {
//     console.log('Style key not found or invalid.');
//   }
// }

// get colorAndCategory() {
//   console.log("selectedColors: ", this.selectedColors, ' | selectedCategoryId: ', this.selectedCategoryId);
//   return { colors: this.selectedColors, categoryId: this.selectedCategoryId };
// }

// fetchProducts(url: string, category: string): void {
//   this.filter.url = url;

//   this.filter.getAll().subscribe({
//     next: (data: any[]) => {
//       const products: Productsearch[] = data.map(item => new Productsearch(
//         item.id, item.name, item.price, item.stockQuantity, item.categoryId,
//         item.productId, item.sizeId, item.sizeValue, item.productColor,
//         item.productMaterial, item.created, item.updated, item.description, item.mainImageUrl, item.filterName
//       ));

//       if (Array.isArray(products)) {
//         products.forEach(product => {
//           Object.keys(this.styleProductIdMap).forEach(categoryKey => {
//             const categoryIds = this.styleProductIdMap[categoryKey];

//             if (categoryIds.includes(product.categoryId)) {
//               const index = categoryIds.indexOf(product.categoryId);

//               if (index === 0 && !this.productForWomen.some(p => p.id === product.id)) {
//                 this.productForWomen.push(product);
//                 console.log("Products for Women:", this.productForWomen);
//                 this.transformedProducts=[];
//                 for (let index = 0; index < this.productForWomen.length; index++) {
//                   this.filter.url='http://localhost:5250/api/ProductAdmin/'+this.productForWomen[index].productId;
//                   this.filter.getAll().subscribe({
//                     next: (data: any[]) => {
//                       this.transformedProducts=data;
//                      console.log("transformedProducts"+this.transformedProducts);
//                     }
//                   }
//           )}
//               } 
//               else if (index === 1 && !this.productForMen.some(p => p.id === product.id)) {
//                 this.productForMen.push(product);
//                 console.log("Products for Men:", this.productForMen);
//                 this.transformedProducts=[];

//                 for (let index = 0; index < this.productForMen.length; index++) {
//                   this.filter.url='http://localhost:5250/api/ProductAdmin/'+this.productForMen[index].productId;
//                   this.filter.getAll().subscribe({
//                     next: (data: any[]) => {
//                       this.transformedProducts=data;
//                      console.log("transformedProducts"+this.transformedProducts);
//                     }
//                   }
//               )}
//               }
//               // Avoid adding the same categoryId more than once
//               this.selectedCategoryId=[];
//               if (!this.selectedCategoryId.includes(product.categoryId)) {
//                 this.selectedCategoryId.push(product.categoryId);
//               }
//             }
//           });
//         });

//         // Now fetch the transformed products for each group
//         this.fetchTransformedProductsForGroup(this.productForWomen, 'Products for Women');
//         this.fetchTransformedProductsForGroup(this.productForMen, 'Products for Men');
//         this.fetchTransformedProductsForGroup(this.productForKids, 'Products for Kids');
//       }

//       this.getproduct();
//     },
//     error: err => {
//       console.error('Error fetching products for selected style:', err);
//     }
//   });
// }

// // Separate method to fetch transformed products
// private fetchTransformedProductsForGroup(products: Productsearch[], groupName: string): void {
//   products.forEach(product => {
//     this.filter.url = `http://localhost:5250/api/ProductAdmin/${product.productId}`;
    
//     this.filter.getAll().subscribe({
//       next: (data: any[]) => {
//         const transformedProduct = data.find(prod => prod.id === product.id);
//         if (!this.transformedProducts.some(p => p.id === transformedProduct.id)) {
//           this.transformedProducts.push(transformedProduct);
//           console.log(`Transformed Products for ${groupName}:`, this.transformedProducts);
//         }
//       },
//       error: err => {
//         console.error(`Error fetching transformed products for ${groupName}: `, err);
//       }
//     });
//   });
// }

// transformedProducts: Product2[] = [];
// getproduct() {
//   console.log(this.selectedCategoryId + " this.selectedCategoryId");

//   // إعادة تعيين مصفوفة المنتجات المحولة
//   this.transformedProducts = [];

//   if (this.selectedCategory === 'WOMAN') {
//     console.log("Products for Womenooo:", this.productForWomen);
//     this.fetchAndLogProducts(this.productForWomen);
//   } else if (this.selectedCategory === 'MAN') {
//     console.log("Products for MANaaa:", this.productForMen);
//     this.fetchAndLogProducts(this.productForMen);
//   }
// }
// private fetchAndLogProducts(products: any[]) {
//   // التكرار على المنتجات
//   products.forEach((prod: any) => {
//     const productUrl = `http://localhost:5250/api/ProductAdmin/${prod.id}`;

//     this.filter.url = productUrl; // تعيين رابط المنتج في filter

//     this.filter.getAll().subscribe({
//       next: (data: any) => {
//         // التحقق من عدم وجود المنتج مسبقًا في transformedProducts
//         const exists = this.transformedProducts.some((existingProduct: any) => existingProduct.id === data.id);
        
//         if (!exists) {
//           // إذا لم يكن المنتج موجودًا، أضفه
//           this.transformedProducts.push(data);
//           console.log("Transformed Product:", data);

//           // تسجيل المنتجات المحولة بعد التحديث
//           console.log("Updated Transformed Products:", this.transformedProducts);
//         } else {
//           console.log(`Product with ID ${data.id} is already added.`);
//         }
//       },
//       error: (err) => {
//         console.error("Error fetching product: ", err); // عرض رسالة خطأ في حالة الفشل
//       }
//     });
//   });
// }


// }

// class Productsearch {
// constructor(
//   public id: number,
//   public productName: string,
//   public price: number,
//   public stockQuantity: number,
//   public categoryId: number,
//   public productId?: number,
//   public sizeId?: number,
//   public sizeValue?: string,
//   public productColor?: number,
//   public productMaterial?: number,
//   public created?: string,
//   public updated?: string,
//   public description?: string,
//   public mainImageUrl?: string,
//   public filterName?: string[]
// ) {}
// }
import { CommonModule } from "@angular/common";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { ProductModule } from "../../../product/product.module";
import { Product2 } from "../../../productfilter/components/productfilter/productfilter.component";
import { FilterService } from "../../../productfilter/services/filter.service";
import { ColorsearchComponent } from "../colorsearch/colorsearch.component";


@Component({
  selector: 'app-filtersearch',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent, ColorsearchComponent, ProductModule],
  templateUrl: './filtersearch.component.html',
  styleUrls: ['./filtersearch.component.css']
})
export class FiltersearchComponent implements OnInit {
  category: string[] = ['WOMAN', 'MAN'];
  categoryId: number[] = [2, 3, 4];
  styleProductIdMap: { [key: string]: number[]; } = {
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
    'PERFUMES': [29, 55],
    'SUITS': [30, 48],
    'CO-ORD SETS': [1,32],
    'BASICS': [1,33],
    'SPECIAL PRICE': [34, 56],
    'BESTSELLERS': [1,36],
    'LEATHER': [1,37],
    'JACKETS': [0,38],
    'GILETS': [1,38],
    'COATS': [1,39],
    'TRENCH COATS': [1,39],
    'PUFFERS': [1,40],
    'CARGO': [1,44],
    'HOODIES': [1,45],
    'TRACKSUITS': [36, 49],
    'OVERSHIRTS': [37, 50],
    'POLO SHIRTS': [38, 52],
    'MAKEUP': [40]
  };

  colors: { name: string; hsl: string; }[] = [
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
  this.getproduct();
  console.log('Selected Category:', this.selectedCategory);
}

// Define variables to hold products for different categories
productForWomen: Productsearch[] = [];
productForMen: Productsearch[] = [];
productForKids: Productsearch[] = [];

@Output() colorsSelected: EventEmitter<{ colors: string[]; categoryId: number[]; }> = new EventEmitter();

constructor(private route: ActivatedRoute, private filter: FilterService) { }

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
productIds:number[]=[]
fetchedCategories: Set<string> = new Set(); // تعريف المتغير كمجموعة

public fetchProductsByCategory(category: string): void {
  const productIds = this.styleProductIdMap[category];
  console.log('Product IDs for category:', category, productIds); // سجل معرفات المنتجات للفئة

  if (productIds && productIds.length > 0) { // تحقق إذا كانت المعرفات موجودة
    productIds.forEach(id => {
      const url = `http://localhost:5250/api/Products/category/${id}`;
      console.log('Fetching URL for ID:', url); // سجل URL للطلب
      this.fetchProducts(url, category);
    });
  } else {
    console.warn(`No product IDs found for category: ${category}`);
  }
}

fetchProductsByKeyword(keyword: string): void {
  const words = keyword.split(' ');
  const matchingCategories: Set<string> = new Set(); 
  const matchingColors: string[] = [];
  const selectedCategoryIds: number[] = []; 

  // البحث عن الفئات المتطابقة
  words.forEach(word => {
      const categories = Object.keys(this.styleProductIdMap).filter(cat => 
          cat.toUpperCase().includes(word.toUpperCase())
      );
      categories.forEach(cat => matchingCategories.add(cat)); 
  });

  // استخراج أول قيمة من matchingCategories
  const firstCategory = Array.from(matchingCategories.values())[0];
  console.log('First Matching Category:', firstCategory); // طباعة أول فئة متطابقة

  // إذا كان لديك منطق آخر للعمل مع firstCategory، يمكنك استخدامه هنا
  if (firstCategory) {
      // استخدام firstCategory حسب الحاجة
      console.log('Fetching products for first category:', firstCategory);
      this.fetchProductsByCategory(firstCategory);
      this.fetchedCategories.add(firstCategory);
  } else {
      console.warn(`No matching categories found for keywords: ${keyword}`);
  }

  // Handle color matches (بقية الكود يبقى كما هو)
  // ...
  words.forEach(word => {
    const colorMatch = this.colors.find(color => color.name.toUpperCase() === word.toUpperCase());
    if (colorMatch) {
      matchingColors.push(colorMatch.name);
    }
  });
  if (matchingColors.length > 0) {
    let styleKey = firstCategory || 'BLAZERS'; 

    this.sendToColorSearchComponent(matchingColors, styleKey);
}
  // سجل معلومات التصحيح
  console.log('Matching Categories:', Array.from(matchingCategories));
  console.log('Matching Colors:', matchingColors);
  console.log('Selected Category IDs:', this.selectedCategoryId);
}



selectedColors: string[] = [];
selectedCategoryId: number[] = [];

sendToColorSearchComponent(colors: string[], styleKey: string): void {
  if (colors.length > 0 && this.styleProductIdMap[styleKey]) {
    const firstFiveCategoryIds = this.styleProductIdMap[styleKey].slice(0, 5); // أخذ أول 5 أرقام من المفتاح المحدد
    console.log('Sending colors to colorsearch component with category IDs:', colors, firstFiveCategoryIds);

    // Emit the colors and first 5 category IDs to the colorsearch component
    this.colorsSelected.emit({ colors, categoryId: firstFiveCategoryIds });
    this.selectedColors=colors;
    // تحديث selectedCategoryId
   // this.selectedCategoryId=[];
    this.selectedCategoryId = firstFiveCategoryIds; // تحديث المعرفات المختارة
  } else {
    //this.selectedCategoryId = productIds; // تحديث المعرفات المختارة
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

              if (index === 0 && !this.productForWomen.some(p => p.id === product.id)) {
                this.productForWomen=[];
                this.transformedProducts=[];
                this.productForWomen.push(product);
                console.log("Products for Women:", this.productForWomen);
                for (let index = 0; index < this.productForWomen.length; index++) {
                  this.filter.url='http://localhost:5250/api/ProductAdmin/'+this.productForWomen[index].productId;
                  this.filter.getAll().subscribe({
                    next: (data: any[]) => {
                      this.transformedProducts=[];
                      this.transformedProducts=data;
                     console.log("transformedProducts"+this.transformedProducts);
                    }
                  }
          )}
              } 
              else if (index === 1 && !this.productForMen.some(p => p.id === product.id)) {
                this.productForMen.push(product);
                console.log("Products for Men:", this.productForMen);
                this.transformedProducts=[];

                for (let index = 0; index < this.productForMen.length; index++) {
                  this.filter.url='http://localhost:5250/api/ProductAdmin/'+this.productForMen[index].productId;
                  this.filter.getAll().subscribe({
                    next: (data: any[]) => {
                      this.transformedProducts=data;
                     console.log("transformedProducts"+this.transformedProducts);
                    }
                  }
              )}
              }
              // Avoid adding the same categoryId more than once
              this.selectedCategoryId=[];
              if (!this.selectedCategoryId.includes(product.categoryId)) {
                this.selectedCategoryId.push(product.categoryId);
              }
            }
          });
        });

        // Now fetch the transformed products for each group
        this.fetchTransformedProductsForGroup(this.productForWomen, 'Products for Women');
        this.fetchTransformedProductsForGroup(this.productForMen, 'Products for Men');
        this.fetchTransformedProductsForGroup(this.productForKids, 'Products for Kids');
      }

      this.getproduct();
    },
    error: err => {
      console.error('Error fetching products for selected style:', err);
    }
  });
}

// Separate method to fetch transformed products
private fetchTransformedProductsForGroup(products: Productsearch[], groupName: string): void {
  products.forEach(product => {
    this.filter.url = `http://localhost:5250/api/ProductAdmin/${product.productId}`;
    
    this.filter.getAll().subscribe({
      next: (data: any[]) => {
        const transformedProduct = data.find(prod => prod.id === product.id);
        if (!this.transformedProducts.some(p => p.id === transformedProduct.id)) {
          this.transformedProducts.push(transformedProduct);
          console.log(`Transformed Products for ${groupName}:`, this.transformedProducts);
        }
      },
      error: err => {
        console.error(`Error fetching transformed products for ${groupName}: `, err);
      }
    });
  });
}

transformedProducts: Product2[] = [];

getproduct() {
  console.log(this.selectedCategoryId + " this.selectedCategoryId");

  this.transformedProducts = [];

  if (this.selectedCategory === 'WOMAN') {
    console.log("Products for Women:", this.productForWomen);
    this.fetchAndLogProducts(this.productForWomen);
  } else if (this.selectedCategory === 'MAN') {
    console.log("Products for Men:", this.productForMen);
    this.fetchAndLogProducts(this.productForMen); 
  } else {
    console.log("No category selected or no products found.");
  }
}
private fetchAndLogProducts(products: any[]) {
  this.transformedProducts=[];
  products.forEach((prod: any) => {
    const productUrl = `http://localhost:5250/api/ProductAdmin/${prod.id}`;

    this.filter.url = productUrl; // تعيين رابط المنتج في filter

    this.filter.getAll().subscribe({
      next: (data: any) => {
        // التحقق من عدم وجود المنتج مسبقًا في transformedProducts
        const exists = this.transformedProducts.some((existingProduct: any) => existingProduct.id === data.id);
        
        if (!exists) {
          // إذا لم يكن المنتج موجودًا، أضفه
          this.transformedProducts.push(data);
          console.log("Transformed Product:", data);

          // تسجيل المنتجات المحولة بعد التحديث
          console.log("Updated Transformed Products:", this.transformedProducts);
        } else {
          console.log(`Product with ID ${data.id} is already added.`);
        }
      },
      error: (err) => {
        console.error("Error fetching product: ", err); // عرض رسالة خطأ في حالة الفشل
      }
    });
  });
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
