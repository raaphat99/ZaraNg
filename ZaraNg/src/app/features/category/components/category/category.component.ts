import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output,ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';

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



  constructor(public categoryService:CategoryService ,private eRef: ElementRef) {
   //categoryService.url="http://localhost:5250/api/Category/main-categories";
   categoryService.getAll().subscribe({
    next: a => {
      console.log(a); // البيانات التي تم استرجاعها من الخدمة
      this.mainCategories = a; // تعيين البيانات إلى mainCategories
      
      // طباعة mainCategories بعد تعيينها
      console.log(this.mainCategories);
    },
    error: err => {
      console.error('Error fetching categories:', err); // التعامل مع الأخطاء إن وجدت
    }
   })
    // this.mainCategories = [
    //   { id: 1, Name: 'WOMAN', parentid: 0, clicked: false },
    //   { id: 2, Name: 'MEN', parentid: 0, clicked: false },
    //   { id: 3, Name: 'KIDS', parentid: 0, clicked: false },
    //   { id: 4, Name: 'BEAUTY', parentid: 0, clicked: false },
    //   { id: 5, Name: 'Dress', parentid: 1, clicked: false },
    //   { id: 6, Name: 'Shoes', parentid: 1, clicked: false },
    //   { id: 10, Name: 'Shoes', parentid: 2, clicked: false },
    //   { id: 11, Name: 'Brush', parentid: 4, clicked: false },
    //   { id: 7, Name: 'Pants', parentid: 2, clicked: false },
    //   { id: 8, Name: 'Jeans', parentid: 2, clicked: false },
    //   { id: 9, Name: 'Child Dress', parentid: 3, clicked: false },
    // ];
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
  // تغيير الـ URL قبل استدعاء الطلب
  console.log(this.selectedCategoryId);
  this.categoryService.url = 'http://localhost:5250/api/Category/'+this.selectedCategoryId+'/subcategories'; // استبدلي الـ URL هنا بالـ URL الجديد

// استدعاء الـ getByID مع الـ id المطلوب
this.categoryService.getSub().subscribe({
  next: a => {
    this.selectitem = a;
    console.log(this.selectitem); // البيانات التي تم استرجاعها

    this.selectedCategoryId = id; // تعيين الـ id مباشرة
    this.index = this.mainCategories.findIndex(cat => cat.id === id); // إيجاد الـ index بناءً على الـ id
  },
  error: err => {
    console.error('Error fetching categories:', err);
  }
});
      console.log(this.selectedCategoryId);
      this.categorySelected.emit(this.selectedCategoryId);  // استخدام اسم الفئة المحددة
    }
    //console.log("selectedCategoryId"+this.selectedCategoryId);
  }

  
 
}

class Category {
  constructor(public id: number, public name: string,public sizeTypeId:number,public parentCategoryName:string , public parentCategoryId: number, public clicked: boolean ,public description:string) {}
}