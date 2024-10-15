import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import localeEg from '@angular/common/locales/ar-EG';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { OrderService } from '../../services/order.service';
import { OrderDetails } from '../../viewmodels/OrderDetails';
import { OrderItem } from '../../viewmodels/OrderItem';
registerLocaleData(localeEg);

@Component({
  selector: 'app-purchase-detials',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './purchase-detials.component.html',
  styleUrl: './purchase-detials.component.css',
})
export class PurchaseDetialsComponent implements OnInit {
  orderId!: string;
  orderDetails!: OrderDetails;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id')!;

    this.orderService.getOrderDetails(this.orderId).subscribe({
      next: (order: OrderDetails) => {
        this.orderDetails = order;
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
        this.errorMessage = 'Order not found or there was an error.';
      },
    });
  }
  calculateItemTotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + item.subtotal, 0);
  }
}
