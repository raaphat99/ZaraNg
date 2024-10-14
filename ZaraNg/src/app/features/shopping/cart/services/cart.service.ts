import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:5250//api/cart'; // Replace with actual API URL

  constructor(private http: HttpClient) { }

  // Method to get all cart items for a user
  getCartItems(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  // Method to add a new item to the cart
  addCartItem(productVariantId: number, userId: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { productVariantId, userId });
  }

  // Method to remove an item from the cart
  removeCartItem(cartItemId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${cartItemId}`);
  }
}