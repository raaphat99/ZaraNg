import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { map, Observable } from 'rxjs';
import { Product2 } from '../components/productfilter/productfilter.component';

@Injectable({
  providedIn: 'root'
})
export class FilterService extends ApiService {
  constructor(httpClient: HttpClient) { 
    super("http://localhost:5250/api/Category/main-categories", httpClient);
  }
  private products: any[] = [];

  setProducts(products: any[]) {
    this.products = products;
  }

  getProducts() {
    return this.products;
  }
  filterProductsByVariant(productVariants: any[]): Observable<Product2[]> {
    const url = 'http://localhost:5250/api/Products/api/filterProductsByVariant';
    return this.httpClient.post<Product2[]>(url, productVariants).pipe(
      map(data => data || []), // إعادة مصفوفة فارغة إذا كانت البيانات غير معرفة
    );
  }
}
