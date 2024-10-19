import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../shopping/cart/services/cart.service';
import { PaymentService } from '../../services/payment.service';

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
  showModal: boolean = false; 
  constructor(private router: Router, private cartService: CartService,private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.totalAmount = this.cartService.getCartData().totalPrice;
  }

  selectOption(event: Event, selectedValue: string) {
    this.selectedPaymentOption = selectedValue;
    const selectedDivs = document.querySelectorAll('.option');
    selectedDivs.forEach((div) => div.classList.remove('selected'));
    (event.currentTarget as HTMLElement).classList.add('selected');
  }
  openModal() {
    this.showModal = true;
  }
  
  closeModal() {
    this.showModal = false;
  }

  
  proceedToConfirmOrder() {
    
    const cartData = this.cartService.getCartData();
    console.log(cartData);
    cartData.paymentMethod = 'ONLINE';
    this.paymentService.createOrder(cartData).subscribe({
      next: (response) => {
        // Access the hash here
        console.log(response.status);
        if(response.redirectUrl){
        window.location.href = response.redirectUrl;
        }else{
          console.log(response.message);
          this.openModal();
          setTimeout(() => {
            this.closeModal();
          }, 2000);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 3000);
          
        }
        
        // Use the hash for Kashier payment or whatever you need
      },
      error: (error) => {
        console.error('Error creating order:', error);
        // Handle error appropriately
    console.log(cartData);
  
  
    // You can send this data to the backend for order processing

  }});
  
  }
  
}
