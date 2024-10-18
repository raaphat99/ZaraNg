import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../shopping/cart/services/cart.service';

@Component({
  selector: 'app-payment-options',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './payment-options.component.html',
  styleUrl: './payment-options.component.css'
})
export class PaymentOptionsComponent implements OnInit {
  paymentOptions = [
    { name: 'Visa', value: 'ONLINE', iconSrc: '../../../../../assets/images/payment-options/visa.svg' },
    { name: 'Mastercard', value: 'ONLINE', iconSrc: '../../../../../assets/images/payment-options/mastercard.svg' },
    { name: 'Gift Card', value: 'GiftCard', iconSrc: '../../../../../assets/images/payment-options/gift-card.svg' },
    { name: 'Pay on delivery', value: 'POD', iconSrc: '../../../../../assets/images/payment-options/pod.svg' },
  ];
  selectedPaymentOption: string = "Mastercard";
  totalAmount!: number;
  currencyCode: string = 'EGP';
  
  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.totalAmount = this.cartService.getCartData().totalPrice;
  }

  selectOption(event: Event, selectedValue: string) {
    this.selectedPaymentOption = selectedValue;
    const selectedDivs = document.querySelectorAll('.option');
    selectedDivs.forEach((div) => div.classList.remove('selected'));
    (event.currentTarget as HTMLElement).classList.add('selected');
  }

  proceedToConfirmOrder() {
    // Set the payment method in the service
    this.cartService.setPaymentMethod(this.selectedPaymentOption);
  
    // Now you can retrieve the entire cart data if needed for final confirmation
    const cartData = this.cartService.getCartData();
    console.log(cartData);
  
    // You can send this data to the backend for order processing

  }
  
}
