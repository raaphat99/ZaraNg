import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,FormsModule,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchQuery: string = ''; 

  constructor(private router: Router) {} 
  navigateToFilterSearch2(query: string): void {
    this.router.navigate(['/filtersearch'], { queryParams: { query } }); // تمرير القيمة كمعامل
  }
  navigateToFilterSearch(): void {
    this.router.navigate(['/filtersearch'], { queryParams: { query: this.searchQuery } }); // تمرير القيمة كمعامل
  }
}
