import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: Product[] = [{
    name: 'OVERSIZE POPLIN SHIRT',
    price: 25,
    img: 'https://static.zara.net/assets/public/57ad/bb54/bcf642388537/94f46c40a431/07545203020-p/07545203020-p.jpg?ts=1724857479757&w=379&f=auto',
    quantity: 1,
    color : 'black',
    size : 'L'
  },{
    name: 'OVERSIZE POPLIN SHIRT',
    price: 25,
    img: 'https://static.zara.net/assets/public/530f/51b5/0cfe450d8c52/3bf03bd5aeac/08574409712-e1/08574409712-e1.jpg?ts=1724680456417&w=379&f=auto',
    quantity: 1,
    color : 'black',
    size : 'L'
  },{
    name: 'OVERSIZE POPLIN SHIRT',
    price: 25,
    img: 'https://static.zara.net/assets/public/55c4/3686/1c35462eb79d/82daf19fc90b/08574770401-p/08574770401-p.jpg?ts=1718278653952&w=379&f=auto',
    quantity: 1,
    color : 'black',
    size : 'L'
  },{
    name: 'OVERSIZE POPLIN SHIRT',
    price: 25,
    img: 'https://static.zara.net/assets/public/6687/984c/81364951a5ff/6fada239ed24/01887470800-p/01887470800-p.jpg?ts=1726754847093&w=379&f=auto',
    quantity: 1,
    color : 'black',
    size : 'L'
  },{
    name: 'OVERSIZE POPLIN SHIRT',
    price: 25,
    img: 'https://static.zara.net/assets/public/1cdb/cd4b/5fdc4a869711/7d56a280a8ee/05644833251-p/05644833251-p.jpg?ts=1724310353735&w=379&f=auto',
    quantity: 1,
    color : 'black',
    size : 'L'
  },{
    name: 'OVERSIZE POPLIN SHIRT',
    price: 25,
    img: 'https://static.zara.net/assets/public/1cdb/cd4b/5fdc4a869711/7d56a280a8ee/05644833251-p/05644833251-p.jpg?ts=1724310353735&w=379&f=auto',
    quantity: 1,
    color : 'black',
    size : 'L'
  }
];

// Getter for dynamically calculating the total amount
get totalAmount(): number {
  return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Method to add an item to the cart
addToCart(item: { price: number, quantity: number , name: string, img: string, color : string, size : string}) {
  this.cartItems.push(item);
  // This will automatically update the cartItemsCount and totalAmount
}

// Method to remove an item from the cart
removeFromCart(item: Product) {
  const index = this.cartItems.indexOf(item);
  if (index > -1) {
    this.cartItems.splice(index, 1);
    this.deletedProduct = { ...item };
    setTimeout(() => {
      this.deletedProduct = null;
    }, 5500);
  }
  
}

addToWishlist(item: Product) {
  const index = this.cartItems.indexOf(item);
  if (index > -1) {
    this.cartItems.splice(index, 1);
    this.addedToWishlist = { ...item };
    setTimeout(() => {
      this.addedToWishlist = null;
    }, 5500);
  }
}
addedToWishlist: Product | null = null;
deletedProduct: Product | null = null;
currencyCode: string = 'EGP';
onContinue() {
  // Handle continue button click
  console.log('Continue clicked');
}

increaseQuantity(item: Product) {
  item.quantity++;
  this.cartItems.length++;
}

decreaseQuantity(item: Product) {
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    // If quantity becomes 0, remove the item from the cart
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.deletedProduct = { ...item };
      setTimeout(() => {
        this.deletedProduct = null;
      }, 5500);
    }
  }
}
get cartItemsCount(): number {
  return this.cartItems.length;
}
// Method to check if the cart is empty
isCartEmpty(): boolean {
  return this.cartItems.length === 0;
}
undoDelete() {
  if (this.deletedProduct) {
    this.cartItems.push(this.deletedProduct);
    this.deletedProduct = null;
  }
}
// Method to show the list of items in the Wishlist
seeList(){} 
isShoppingBagActive: boolean = true;
toggleShoppingBag() {
  this.isShoppingBagActive = !this.isShoppingBagActive;
}

}
interface Product {
  name: string;
  price: number;
  img: string;
  quantity: number;
  color : string;
  size : string;
}
