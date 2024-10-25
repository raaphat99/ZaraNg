import { AuthService } from './../../../../core/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiService } from '../../../../core/services/api.service';

export interface WishListItemDTO {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description : string;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService extends ApiService {

  private headers: any;

  constructor(httpClient: HttpClient, private authService: AuthService) {
    super("http://localhost:5250/api/WishList", httpClient)
    this.headers = this.authService.getAuthHeaders();
  }

  // Method to get all wishlist items for a user
  getAllItems(): Observable<WishListItemDTO[]> {
    return this.httpClient.get<WishListItemDTO[]>(`${this.url}`, {
      headers: this.headers 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Method to add a new item to the wishlist
  addToWishlist(productId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/${productId}`, {}, {
      headers: this.headers , 
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
    return this.httpClient.post<any>(`${this.url}/move-to-cart/${wishlistItemId}`, {}, {
      headers: this.headers 
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

  addProductToWishlist(productId: number): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.httpClient.post(`${this.url}/addProduct/${productId}`, null, { headers });
  }

  removeFromWishlist(productId: number): Observable<any> {
    return this.httpClient.post(`${this.url}/removeProduct/${productId}`, null, { headers: this.headers  });
  }

  isInWishlist(productId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.url}/isInWishlist/${productId}`, { headers: this.headers  });
  }



}
