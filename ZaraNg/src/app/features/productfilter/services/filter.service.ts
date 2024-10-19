import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../core/services/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productsearch } from '../viewmodels/product-search';

@Injectable({
  providedIn: 'root',
})
export class FilterService extends ApiService {
  private apiUrl = 'http://localhost:5250/api/Products';

  constructor(httpClient: HttpClient) {
    super('http://localhost:5250/api/Category/main-categories', httpClient);
  }

  fetchProductsByMaterial(
    categoryId: number,
    material: string
  ): Observable<any> {
    const url = `${this.apiUrl}/filter?categoryId=${categoryId}&materials=${material}`;
    console.log('Fetching URL:', url);
    return this.httpClient.get<any>(url);
  }

  fetchProductsByCategory(categoryId: number): Observable<any> {
    const url = `${this.apiUrl}/category/${categoryId}`;
    console.log('Fetching URL:', url);
    return this.httpClient.get<any>(url);
  }

  fetchProductsByMultipleCategories(categoryIds: number[]): Observable<any[]> {
    const requests = categoryIds.map((id) =>
      this.httpClient.get<any[]>(`${this.apiUrl}/category/${id}`)
    );
    return requests.length > 1
      ? this.httpClient.get<any[]>(
          `${this.apiUrl}/category/${categoryIds.join(',')}`
        )
      : requests[0];
  }

  clearProductvc() {
    return {
      id: 0,
      productId: 0,
      productName: '',
      sizeId: 0,
      sizeValue: '',
      price: 0,
      stockQuantity: 0,
      productColor: 0,
      productMaterial: 0,
      categoryId: 0,
    } as Productsearch;
  }
}
