import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface WishListItemDTO {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:5250/api/WishList';

  constructor(private http: HttpClient) { }

  // Method to get all wishlist items for a user
  getAllItems(): Observable<WishListItemDTO[]> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<WishListItemDTO[]>(`${this.apiUrl}`, {
      headers 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Method to add a new item to the wishlist
  addToWishlist(productId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>(`${this.apiUrl}/${productId}`, {}, {
      headers, 
      observe: 'response'
    }).pipe(
      tap((response) => {
        console.log(response);
        console.log('Item added to wishlist successfully');
      }),
      catchError(this.handleError)
    );
  }

  // Method to move an item from wishlist to cart
  moveToCart(wishlistItemId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>(`${this.apiUrl}/move-to-cart/${wishlistItemId}`, {}, {
      headers
    }).pipe(
      tap((response) => {
        console.log('Item moved to cart successfully');
        console.log(response);
      }),
      catchError(this.handleError)
    );
  }

  // Method to handle errors
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

}
