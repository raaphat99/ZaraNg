import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output,ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  menuVisible: boolean = false;
  menuVisible2: boolean = false;
  menuVisible3: boolean = true;


  index: number = 1;

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    const clickedInside = this.eRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.menuVisible2 = false; // إخفاء الـ div1 إذا كان النقر خارجها
      this.mainCategories.forEach(category => category.clicked = false);
      this.menuVisible=true
      this.menuVisible3=true
    }
  }

  @Output() categorySelected = new EventEmitter<number>();



  constructor( private eRef: ElementRef) {
   
    this.mainCategories = [
      { id: 1, Name: 'WOMAN', parentid: 0, clicked: false },
      { id: 2, Name: 'MEN', parentid: 0, clicked: false },
      { id: 3, Name: 'KIDS', parentid: 0, clicked: false },
      { id: 4, Name: 'BEAUTY', parentid: 0, clicked: false },
      { id: 5, Name: 'Dress', parentid: 1, clicked: false },
      { id: 6, Name: 'Shoes', parentid: 1, clicked: false },
      { id: 10, Name: 'Shoes', parentid: 2, clicked: false },
      { id: 11, Name: 'Brush', parentid: 4, clicked: false },
      { id: 7, Name: 'Pants', parentid: 2, clicked: false },
      { id: 8, Name: 'Jeans', parentid: 2, clicked: false },
      { id: 9, Name: 'Child Dress', parentid: 3, clicked: false },
    ];
  }

  clicked(id: number) {
    this.mainCategories.forEach(category => category.clicked = false);
    let selectedCategory = this.mainCategories.find(category => category.id === id);
    
    if (selectedCategory) {
      selectedCategory.clicked = true;
      this.selectedCategoryId = selectedCategory.id;
      this.index = selectedCategory.id;
      this.selectitem = this.mainCategories.filter(category => category.parentid === id);
      this.menuVisible = true;
   
        this.menuVisible2=true;
      

      

      // Emit the selected category name to HomeComponent

     

      console.log(this.selectedCategoryId);
      this.categorySelected.emit(this.selectedCategoryId);  // استخدام اسم الفئة المحددة
    }
  
    console.log("selectedCategoryId"+this.selectedCategoryId);
  }

  getBackgroundImage(): string {
    const imageMap: { [key: number]: string } = {
      1: 'img1.jpg',
      2: 'img11.jpg',
      3: 'img3.jpg',
      4: 'img8.jpg',
    };
    return this.selectedCategoryId !== null ? imageMap[this.selectedCategoryId] : 'default.jpg';
  }

  shouldDisplayNew(): boolean {
    return this.selectitem.some(item => item.parentid === 1 || item.parentid === 2);
  }

  isHeaderTransparent(): boolean {
    const isTransparent = this.selectedCategoryId !== null;
    console.log('isHeaderTransparent:', isTransparent);
    return isTransparent;
  }
}

class Category {
  constructor(public id: number, public Name: string, public parentid: number, public clicked: boolean) {}
}