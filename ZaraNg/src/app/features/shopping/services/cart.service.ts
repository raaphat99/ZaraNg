import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService extends ApiService {
  constructor(httpClient: HttpClient, private authService: AuthService) {
    super('http://localhost:5250/api/Cart', httpClient);
  }

  addToCart(variantId: number) {
    const headers = this.authService.getAuthHeaders();
    return this.httpClient.post(
      `${this.url}?productVariantId=${variantId}`,
      null,
      {
        headers: headers,
        responseType: 'text', // Expect a plain text response from the server (the default responseType is json)
      }
    );
  }
}
