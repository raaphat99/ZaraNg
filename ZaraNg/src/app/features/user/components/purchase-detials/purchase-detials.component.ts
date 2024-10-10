import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import localeEg from '@angular/common/locales/ar-EG';
import { CommonModule, registerLocaleData } from '@angular/common';
registerLocaleData(localeEg);

@Component({
  selector: 'app-purchase-detials',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './purchase-detials.component.html',
  styleUrl: './purchase-detials.component.css'
})
export class PurchaseDetialsComponent  implements OnInit {
  orderId!: string; // Initialize to null or an empty string
  orderDetails: any; // Define your type here
  orders = [
    {
      orderId: 'Z123456789',
      date: 'October 1, 2024',
      status: 'Delivered',
      items: [
        {
          name: 'Black T-Shirt',
          size: 'M', // Include size if necessary
          color: 'Black', // Include color if necessary
          price: 25.99,
          quantity: 2,
          imageUrl: '1.jpeg' // Add image URL
        },
        {
          name: 'Denim Jeans',
          size: 'L', // Include size if necessary
          color: 'Blue', // Include color if necessary
          price: 55.99,
          quantity: 1,
          imageUrl: '2.jpeg' // Add image URL
        }
      ],
      totalAmount: 1007.97,
      customer: {
        name: 'Rawan Waly',
        email: 'rawanwaly27@gmail.com',
        phone: '01001423697'
      },
      shippingAddress: 'Cairo, Egypt, Apartment No. 7, Floor 4',
      paymentMethod: 'Cash on delivery'
    }
  ];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id')!;
    console.log('Received orderId:', this.orderId); // This should log the correct ID
    this.orderDetails = this.orders.find(order => order.orderId === this.orderId);
    
    if (!this.orderDetails) {
      console.error('Order details not found for ID:', this.orderId);
    }
  }
  
  
}
