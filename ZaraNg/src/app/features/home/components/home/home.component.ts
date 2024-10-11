import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  mainCategories: Category[];
  selectitem: Category[] = [];
  selectedCategoryId: number | null = null;
  menuVisible: boolean = false;
  isBackgroundChanging: boolean = true; // التحكم في تشغيل/إيقاف تغيير الخلفيات
  index:number=1;
  
  ngOnInit() {
    this.startAutoScroll(); // بدء التمرير التلقائي عند تحميل المكون

  }

  private scrollInterval: any; // لتخزين المؤقت للتمرير



  startAutoScroll() {
    clearInterval(this.scrollInterval);
    const sections = ['section1', 'section2', 'targetDiv', 'section3', 'section4']
    let currentIndex = 0; 
    this.scrollInterval = setInterval(() => {
        if (currentIndex >= sections.length) {
            clearInterval(this.scrollInterval);
            this.scrollToTop();
            return;
        }
        const targetElement = document.getElementById(sections[currentIndex]);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); 

            currentIndex++; 
        }
    }, 800); 
}


scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
 }
  stopAutoScroll() {
    clearInterval(this.scrollInterval);
  }
  ngOnDestroy() {
    this.stopAutoScroll();
  }
  currentBackground: string = 'img10.jpg';
  currentBackground1: string = 'img11.jpg';
  currentBackground2: string = 'img12.jpg';
  currentIndex:number = 0;
  images: string[] = ['img10.jpg', 'img4.jpg', 'img6.png'];

  constructor() {
    this.mainCategories = [
      { id: 1, Name: 'WOMAN', parentid: 0, clicked: false },
      { id: 2, Name: 'MEN', parentid: 0, clicked: false },
      { id: 3, Name: 'KIDS', parentid: 0, clicked: false },
      { id: 4, Name: 'BEAUTY', parentid: 0, clicked: false },
      { id: 5, Name: 'Dress', parentid: 1, clicked: false },
      { id: 6, Name: 'Shose', parentid: 1, clicked: false },
      { id: 10, Name: 'Shose', parentid: 2, clicked: false },
      { id: 11, Name: 'brush', parentid: 4, clicked: false },
      { id: 7, Name: 'Pants', parentid: 2, clicked: false },
      { id: 8, Name: 'Jeans', parentid: 2, clicked: false },
      { id: 9, Name: 'child_Dress', parentid: 3, clicked: false },
    ];
  }


  isArrowClicked:boolean=false;

clicked(id: number) {
  this.isBackgroundChanging = false;
  clearInterval(this.scrollInterval);

  if (this.isArrowClicked) {
    this.isArrowClicked = false; 
  }

  this.mainCategories.forEach(category => {
    category.clicked = false;
  });
  const selectedCategory = this.mainCategories.find(category => category.id === id);
  if (selectedCategory) {
    selectedCategory.clicked = true;
    this.selectedCategoryId = selectedCategory.id;
    this.index=this.selectedCategoryId;
  }

  this.selectitem = this.mainCategories.filter(category => category.parentid === id);
  this.menuVisible = true;
}

clickedNext() {
  this.isArrowClicked = true; 
  if (this.index < 4) {
    this.index += 1;
  } else {
    this.index = 1;
  }
  this.clicked(this.index); // استدعاء دالة clicked بعد تعديل قيمة index
}

clickedPrev() {
  this.isArrowClicked = true; // تعيين العلم بأن الضغط تم من السهم
  if (this.index > 1) {
    this.index -= 1;
  } else {
    this.index = 4; // العودة إلى آخر index
  }
  this.clicked(this.index); // استدعاء دالة clicked بعد تعديل قيمة index
}

  
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
    if (this.menuVisible) {
      // عند النقر على القائمة، إيقاف تغيير الخلفيات
      this.isBackgroundChanging = false;
      this.clicked(1);
    } else {
      this.selectedCategoryId = null;
      this.selectitem = [];
    }
  }

  getBackgroundImage11(): string {
    const imageMap: { [key: number]: string } = {
      1: 'img1.jpg',
      2: 'img11.jpg',
      3: 'img3.jpg',
      4: 'img8.jpg',
    };
    return this.selectedCategoryId !== null ? imageMap[this.selectedCategoryId] : 'img1.jpg';
  }

  getBackgroundImage12(): string {
    const imageMap: { [key: number]: string } = {
      1: 'img4.jpg',
      2: 'img5.jpg',
      3: 'img11.jpg',
      4: 'img10.jpg',
    };
    return this.selectedCategoryId !== null ? imageMap[this.selectedCategoryId] : 'img4.jpg';
  }

  getBackgroundImage21(): string {
    const imageMap: { [key: number]: string } = {
      1: 'img6.png',
      2: 'img9.jpg',
      3: 'img13.jpg',
      4: 'img12.jpg',
    };
    return this.selectedCategoryId !== null ? imageMap[this.selectedCategoryId] : 'img6.png';
  }
  shouldDisplayNew(): boolean {
    return this.selectitem.some(item => item.parentid === 1 || item.parentid === 2);
  }
  isHeaderTransparent(): boolean {
    return this.selectedCategoryId === null;
  }
}
class Category{
  constructor(public id:number,public Name:string,public parentid:number,public clicked:boolean){}
}