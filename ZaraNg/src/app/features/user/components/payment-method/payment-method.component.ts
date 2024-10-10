import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface PaymentMethod {
  name: string;
  icon: string;
  cardHolder: string;
  last4Digits: string;
  expirationDate: string;
}

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.css'
})
export class PaymentMethodComponent {
  paymentMethods: PaymentMethod[] = [
    {
      name: 'Visa',
      icon: 'https://static.zara.net/static/images/payment/NewIcon/Icons_Payment_Methods/Payments/SVG/icon-payment-visa_new.svg',
      cardHolder: 'John Doe',
      last4Digits: '1234',
      expirationDate: '09/24'
    },
    {
      name: 'MasterCard',
      icon: 'https://static.zara.net/static/images/payment/NewIcon/Icons_Payment_Methods/Payments/SVG/icon-payment-mastercard.svg',
      cardHolder: 'Jane Smith',
      last4Digits: '5678',
      expirationDate: '08/25'
    }, {
      name: 'MasterCard',
      icon: 'https://static.zara.net/static/images/payment/NewIcon/Icons_Payment_Methods/Payments/SVG/icon-payment-mastercard.svg',
      cardHolder: 'Jane Smith',
      last4Digits: '5678',
      expirationDate: '08/25'
    }
  ];
  showDeleteConfirmation: boolean = false;
  methodToDelete: PaymentMethod | null = null;
  cardHolderNameToDelete: string | null = null; 

  confirmDelete(method: PaymentMethod) {
    this.methodToDelete = method;
    this.showDeleteConfirmation = true; 
    this.cardHolderNameToDelete = method.cardHolder; 

  }

  deletePaymentMethod() {
    if (this.methodToDelete) {
      this.paymentMethods = this.paymentMethods.filter(method => method !== this.methodToDelete);
      this.methodToDelete = null;

    }
    this.showDeleteConfirmation = false;
    this.cardHolderNameToDelete = null; 
  }

  cancelDelete() {
    this.showDeleteConfirmation = false; 
    this.cardHolderNameToDelete = null; 

  }
  
}

