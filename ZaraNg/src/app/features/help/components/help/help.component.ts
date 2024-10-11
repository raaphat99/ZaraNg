import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent {
  isVisible1: boolean = false; // لجعل النص مخفيًا في البداية
  itemHeight1: number = 200; // الارتفاع الافتراضي
  isVisible2: boolean = false; // لجعل النص مخفيًا في البداية
  isVisible3: boolean = false; // لجعل النص مخفيًا في البداية
  isVisible4: boolean = false; // لجعل النص مخفيًا في البداية
  itemHeight2: number = 200; // الارتفاع الافتراضي

  toggleView(itemIndex: number) {
    if (itemIndex === 1) {
      this.isVisible1 = !this.isVisible1; // عكس الحالة عند الضغط
      if(this.itemHeight1==270){
        this.itemHeight1;
      }else{
        if(!this.isVisible1&&this.isVisible2){
          this.itemHeight1;
        }
        this.itemHeight1 += this.isVisible1 ? 20 : -20; // زيادة أو تقليل الارتفاع بمقدار 50
      }
    } 
    else if (itemIndex === 2) {
      this.isVisible2 = !this.isVisible2; // عكس الحالة عند الضغط
      if(this.itemHeight1==220){
        this.itemHeight1+=50;
      }else{
        if(this.isVisible1&&!this.isVisible2){
          this.itemHeight1-=50;
        }else{
          this.itemHeight1 += this.isVisible2 ? 70 : -70; // زيادة أو تقليل الارتفاع بمقدار 70
        }
      }
    } 



    else if (itemIndex === 3) {
      this.isVisible3 = !this.isVisible3; // عكس الحالة عند الضغط
      if(this.itemHeight2==220){
        this.itemHeight2+=90;
     
      }else{
        if(!this.isVisible3&&this.isVisible4){
          this.itemHeight2-=90;
        }else{
          this.itemHeight2 += this.isVisible3 ? 110 : -110; // زيادة أو تقليل الارتفاع بمقدار 110
        }
      }
    } 
    else if (itemIndex === 4) {
      this.isVisible4 = !this.isVisible4; // عكس الحالة عند الضغط
      if(this.itemHeight2==310){
        this.itemHeight2;
      }else{
        if(this.isVisible3&&this.isVisible4){
          this.itemHeight2;
        }
        this.itemHeight2 += this.isVisible4 ? 20 : -20; // زيادة أو تقليل الارتفاع بمقدار 90
      }
    }
  }
  
}
