import { CommonModule, registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import localeEg from '@angular/common/locales/ar-EG';
import { RouterModule } from '@angular/router';


interface Order {
  orderId: string;
  date: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
  }[];
  totalAmount: number;
  status: string;
}
registerLocaleData(localeEg);
@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css'
})
export class PurchasesComponent {
   orders: Order[] = [
    {
      orderId: 'Z123456789',
      date: 'October 1, 2024',
      items: [
        {
          name: 'Black T-Shirt',
          quantity: 2,
          price: 25.99,
          imageUrl: '1.jpeg'
        },
        {
          name: 'Denim Jeans',
          quantity: 1,
          price: 55.99,
          imageUrl: '2.jpeg'
        }
        ,
        {
          name: 'Denim Jeans',
          quantity: 1,
          price: 55.99,
          imageUrl: '2.jpeg'
        }
      ],
      totalAmount: 1007.97,
      status: 'Delivered'
    },
    {
      orderId: '123456789',
      date: 'October 1, 2024',
      items: [
        {
          name: 'Black T-Shirt',
          quantity: 2,
          price: 25.99,
          imageUrl: '1.jpeg'
        },
        {
          name: 'Denim Jeans',
          quantity: 1,
          price: 55.99,
          imageUrl: '2.jpeg'
        },
        {
          name: 'Denim Jeans',
          quantity: 1,
          price: 55.99,
          imageUrl: '2.jpeg'
        },
        {
          name: 'Denim Jeans',
          quantity: 1,
          price: 55.99,
          imageUrl: '2.jpeg'
        }, {
          name: 'Black T-Shirt',
          quantity: 2,
          price: 25.99,
          imageUrl: '1.jpeg'
        },
        {
          name: 'Denim Jeans',
          quantity: 1,
          price: 55.99,
          imageUrl: '2.jpeg'
        },
        {
          name: 'Denim Jeans',
          quantity: 1,
          price: 55.99,
          imageUrl: '2.jpeg'
        }
      ],
      totalAmount: 1007.97,
      status: 'Pending'
    }
  ];
}
