import { CommonModule, registerLocaleData } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import localeEg from '@angular/common/locales/ar-EG';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Order } from '../../viewmodels/purchases';
import { OrderService } from '../../services/order.service';

registerLocaleData(localeEg);
@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css',
})
export class PurchasesComponent implements OnInit {
  orders: Order[] = [];
  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        console.log('Orders:', this.orders);
        console.log('Fetched Orders:', JSON.stringify(this.orders, null, 2));
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      },
    });
  }
  getOrderTotal(items: any[]): number {
    return items.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
  }
}
