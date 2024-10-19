import { Component } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-main',
  standalone: true,
  imports: [FooterComponent, HeaderComponent,CommonModule,FormsModule,RouterLink],
  templateUrl: './admin-main.component.html',
  styleUrl: './admin-main.component.css'
})
export class AdminMainComponent {
  totalOrders: number = 0;
  totalProducts: number = 0;
  totalCategories: number = 0;
  totalCustomers: number = 0;
  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadCounts();
  }

  private loadCounts(): void {
    this.statisticsService.getOrdersCount().subscribe(count => {
      this.totalOrders = count;
    });

    this.statisticsService.getProductsCount().subscribe(count => {
      this.totalProducts = count;
    });

    this.statisticsService.getCategoriesCount().subscribe(count => {
      this.totalCategories = count;
    });

    this.statisticsService.getUsersCount().subscribe(count => {
      this.totalCustomers = count; 
    });
  }
   sections = [
    {
      name: 'Categories',
      isExpanded: false,
      actions: [
        { label: 'View', link: ['/admin', 'categories'] },
      ]
    },
    {
      name: 'Products',
      isExpanded: false,
      actions: [
        { label: 'View', link: ['/admin', 'products'] },
        { label: 'Add', link: ['/admin', 'products', 'create'] },
      ]
    },
    {
      name: 'Orders',
      isExpanded: false,
      actions: [
        { label: 'View', link: ['/admin', 'orders'] }
      ]
    },
    {
      name: 'Customers',
      isExpanded: false,
      actions: [
        { label: 'View', link: ['/admin', 'customers'] },
      ]
    },
    {
      name: 'Admin',
      isExpanded: false,
      actions: [
        { label: 'ADD', link: ['/admin', 'registerAdmin'] },
      ]
    }
 
  ];

  toggleActions(section: any) {
    section.isExpanded = !section.isExpanded;
  }

}
