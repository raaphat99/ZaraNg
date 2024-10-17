import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService extends ApiService {

  constructor(httpClient: HttpClient, private authService: AuthService) { 
    super("http://localhost:5250/api/WishList", httpClient)
  }

  addToWishlist(productId: number): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.httpClient.post(`${this.url}/addProduct/${productId}`, null, { headers });
  }

  removeFromWishlist(productId: number): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.httpClient.post(`${this.url}/removeProduct/${productId}`, null, { headers });
  }

  isInWishlist(productId: number): Observable<boolean> {
    const headers = this.authService.getAuthHeaders();
    return this.httpClient.get<boolean>(`${this.url}/isInWishlist/${productId}`, { headers });
  }
}
