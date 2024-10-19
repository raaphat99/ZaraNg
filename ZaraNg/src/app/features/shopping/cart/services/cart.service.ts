import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


export interface CartItemDTO {
  id: number;
  productVariantId: number;
  quantity: number;
  color: string;
  size: string;
  title: string;
  imageUrl: string;
  price: number;
}



@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5250/api/Cart'; 
  private headers: any;
  private cartData = new BehaviorSubject<any>({
    cartItems: [],
    shippingMethod: null,
    userAddressId: null,
    paymentMethod: null,
    totalPrice: 0
  });

  constructor(private http: HttpClient) { }

  // Method to get all cart items for a user
  getCartItems(): Observable<CartItemDTO[]> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<CartItemDTO[]>(`${this.apiUrl}`, {
      headers 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Method to add a new item to the cart
  addCartItem(productVariantId: number): Observable<any> {  
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>(`${this.apiUrl}/${productVariantId}`, {}, {
      headers, // Pass the headers here
      observe: 'response' // Keep the 'observe' option as specified
    }).pipe(
      tap((response) => {   
      
    })
    ); 
  }

  // Method to remove an item from the cart
  removeOrDecreaseCartItem(cartItemId: number): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.delete(`${this.apiUrl}/${cartItemId}`, {
      headers, // Pass the headers here
      responseType: 'text' // Keep the response type as text if needed
    }
    ).pipe(
      catchError(this.handleError)
    );
  }

  moveToWishlist(cartItemId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>(`${this.apiUrl}/move-to-wishlist/${cartItemId}`,{}, { headers }).pipe(
      tap((response) => {
        console.log('Item moved to wishlist successfully');
        console.log(response);
      }),
      catchError(this.handleError)
    );
  }
  

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 404:
          errorMessage = error.error || 'Not found. The item might be out of stock.';
          break;
        case 405:
          errorMessage = 'Method Not Allowed. Please check the API endpoint and HTTP method.';
          break;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }


  getItemCount(): Observable<number> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
  
    return this.http.get<number>(`${this.apiUrl}/count`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  cartData$ = this.cartData.asObservable();

  setCartItems(cartItems: any[], totalPrice: number) {
    const currentData = this.cartData.getValue();
    currentData.cartItems = cartItems;
    currentData.totalPrice = totalPrice;
    this.cartData.next(currentData);
  }

  setShippingDetails(shippingMethod: string, userAddressId: number) {
    const currentData = this.cartData.getValue();
    currentData.shippingMethod = shippingMethod;
    currentData.userAddressId = userAddressId;
    this.cartData.next(currentData);
  }

  setPaymentMethod(paymentMethod: string) {
    const currentData = this.cartData.getValue();
    currentData.paymentMethod = paymentMethod;
    this.cartData.next(currentData);
  }

  getCartData() {
    return this.cartData.getValue();
  }
}