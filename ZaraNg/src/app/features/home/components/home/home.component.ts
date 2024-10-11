import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { CategoryComponent } from '../../../category/components/category/category.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule, HeaderComponent,CategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  index: number = 1; // بداية من الصورة الأولى
  private scrollInterval: any;

// مصفوفة الصور المتاحة
images: string[] = [
  'img1.jpg', 'img11.jpg', 'img3.jpg', 'img8.jpg',  // المجموعة الأولى
  'img4.jpg', 'img2.jpg', 'img1.jpg', 'img13.jpg',  // المجموعة الثانية
  'img6.png', 'img5.jpg', 'img3.jpg', 'img12.jpg', // المجموعة الثالثة
  'img7.jpg','img9.jpg','img1.jpg','img10.jpg' // المجموعة الرابعة (يمكن أن تحتوي على أقل من 4)
];

// دالة جلب الصور لكل div بناءً على الفهرس الخاص به
getBackgroundImage(divIndex: number): string {
  // توزيع الصور على 4 مجموعات
  const groupSize = 4;
  const groupStartIndex = (divIndex - 1) * groupSize;
  const groupEndIndex = Math.min(groupStartIndex + groupSize, this.images.length); // نهاية المجموعة

  // الحصول على الصورة بناءً على الفهرس الحالي (index)
  const imageIndex = (this.index - 1) % groupSize; // فهرس الصورة داخل المجموعة

  // التحقق من أن الفهرس ضمن النطاق الصحيح
  if (groupStartIndex + imageIndex < groupEndIndex) {
    return this.images[groupStartIndex + imageIndex];
  } else {
    return ''; // في حال تجاوز الفهرس أو عدم وجود صورة
  }
}


  // دالة جلب الصور لكل div بناءً على الفهرس الخاص به
getBackgroundImage2(divIndex: number): string {
  // حساب الفهرس الصحيح للصورة بناءً على الفهرس المحلي (divIndex)
  // divIndex يبدأ من 1، لذا نطرح 1 لتتناسب مع الفهارس في المصفوفة
  const imageIndex = (divIndex - 1 + this.index - 1) % this.images.length; 
  return this.images[imageIndex]; 
}


  ngOnInit() {
    this.startAutoScroll(); // بدء التمرير التلقائي عند تحميل المكون
  }

  // دالة التمرير التلقائي
  startAutoScroll() {
    clearInterval(this.scrollInterval);
    let currentIndex = 1;
    this.scrollInterval = setInterval(() => {
      if (currentIndex >= 5) {
        clearInterval(this.scrollInterval);
        this.scrollToTop();
        return;
      }
      const targetElement = document.getElementById("section"+ currentIndex+"");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        currentIndex++;
      }
    }, 800);
  }

  // دالة التمرير إلى الأعلى
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // إيقاف التمرير التلقائي
  stopAutoScroll() {
    clearInterval(this.scrollInterval);
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }


clicknext2(id:number=0)
{
  if(id!=0){
    this.index=(id-1);
    this.index = (this.index < this.images.length) ? this.index + 1 : 1; // الانتقال للصورة التالية أو العودة للأولى
  }
}

currentindex:number=1;
  // التنقل إلى الصورة التالية
  clickedNext() {
    console.log("index"+this.index);

      this.index = (this.index < this.images.length) ? this.index + 1 : 1; // الانتقال للصورة التالية أو العودة للأولى
      this.currentindex=this.index;
      console.log("currentindex"+this.currentindex);

  }
  
  clickedPrev() {
    this.index = (this.index > 1) ? this.index - 1 : this.images.length; // الانتقال للصورة السابقة أو الانتقال لآخر صورة
  }
}
