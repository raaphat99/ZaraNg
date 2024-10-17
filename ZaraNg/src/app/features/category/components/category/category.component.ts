import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output,ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { HambergermenueService } from '../../services/hambergermenue.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  mainCategories: Category[] = [];
  selectitem: Category[] = [];
  selectedCategoryId: number | null = null;
  menuVisible2: boolean = false;
  menuVisible3: boolean = true;
   subcat:Category[]=[];
   subproduct:Category[]=[]
  index: number = 1;

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    const clickedInside = this.eRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.menuVisible2 = false; // إخفاء الـ div1 إذا كان النقر خارجها
      this.mainCategories.forEach(category => category.clicked = false);
      this.menuVisible3=true
    }
  }
  @Output() categorySelected = new EventEmitter<number>();



  constructor(public categoryService:CategoryService ,private eRef: ElementRef,private router: Router,private menue:HambergermenueService) {
   //categoryService.url="http://localhost:5250/api/Category/main-categories";
   categoryService.getAll().subscribe({
    next: a => {
      console.log(a); 
      this.mainCategories = a; 
      console.log(this.mainCategories);
    },
    error: err => {
      console.error('Error fetching categories:', err); 
    }
   })
  }
  clicked(id: number) {
    this.mainCategories.forEach(category => category.clicked = false);
    let selectedCategory = this.mainCategories.find(category => category.id === id);
    if (selectedCategory) {
      selectedCategory.clicked = true;
      this.selectedCategoryId = selectedCategory.id;
      this.index = selectedCategory.id;
      this.selectitem = this.mainCategories.filter(category => category.parentCategoryId === id);
      this.menuVisible2=true;

       console.log(this.selectedCategoryId);
       this.categoryService.url = 'http://localhost:5250/api/Category/'+this.selectedCategoryId+'/subcategories'; // استبدلي الـ URL هنا بالـ URL الجديد

      this.categoryService.getSub().subscribe({
      next: a => {
      this.selectitem = a;
      console.log(this.selectitem); 
      this.selectedCategoryId = id; 
      this.index = this.mainCategories.findIndex(cat => cat.id === id); 
    },
      error: err => {
      console.error('Error fetching categories:', err);
   }
      });
      console.log(this.selectedCategoryId);
      this.categorySelected.emit(this.selectedCategoryId);  
   }
}
  selectedCategory2: string | null = null; 

  checkAndCallSubcat(name: string, ID: number) {
    this.selectedCategory2 = name;
    this.subcat = [];
    this.subproduct = [];
    this.categoryService.url = '';

    console.log("Selected Category: " + name);
    console.log("ID: " + ID);

    if (name === "WOMAN" || name === "MAN" || name === "KIDS" || name === "Girls" || name === "Boys") {
        this.categoryService.url = 'http://localhost:5250/api/Category/' + ID + '/subcategories';
    } else {
        this.categoryService.url = 'http://localhost:5250/api/products/category/' + ID;
    }
    if (this.categoryService.url !== '') {
        this.categoryService.getSub().subscribe({
            next: data => {
                if (name === "WOMAN" || name === "MAN" || name === "KIDS" || name === "Girls" || name === "Boys") {
                    this.subcat = data;
                    console.log("Subcategories: ", this.subcat);
                } else {
                    this.subproduct = data; 
                    console.log("Products: ", this.subproduct);
                }
                if (this.subproduct.length > 0) {
                  this.router.navigate(['productfilter'], { queryParams: { products: JSON.stringify(this.subproduct) } });
                } else {
                  console.log("No products found for this subcategory.");
                }
            },
            error: err => {
                console.error('Error fetching data:', err);
            }
        });
    } else {
        console.log("Invalid URL or missing category.");
    }
  }
  navigateToSubcatProducts(subcatId: number) {
    const productUrl = 'http://localhost:5250/api/products/category/' + subcatId;

    this.categoryService.url = productUrl;

    this.categoryService.getSub().subscribe({
      next: data => {
        this.subproduct = data; 
        console.log("Products for Subcategory ID " + subcatId + ": ", this.subproduct);
        
        if (this.subproduct.length > 0) {
          console.log("Navigating with products: ", this.subproduct); // تأكد من عرض المنتجات هنا
          this.router.navigate(['productfilter'], { queryParams: { products: JSON.stringify(this.subproduct) } });
        }
        else {
          console.log("No products found for this subcategory.");
        } 

      },
      error: err => {
        console.error('Error fetching products for subcategory:', err);
      }
    });
  }
}

class Category {
  constructor(public id: number, public name: string,public FilterName:string[],public sizeTypeId:number,public parentCategoryName:string , public parentCategoryId: number, public clicked: boolean ,public description:string) {}
}