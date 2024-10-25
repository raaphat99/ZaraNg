import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { variantSize } from '../viewmodels/variant-size';

@Injectable({
  providedIn: 'root'
})
export class ProductVariantService extends ApiService {

  constructor(httpClient: HttpClient) {
    super("http://localhost:5250/api/ProductVariants", httpClient)
  }

  getVariantByVariantId(id: number) : Observable<any> {
    const url = `${this.url}/${id}`;
    return this.httpClient.get<any>(url);
  }

  getSizesByVariantId(variantId: number): Observable<variantSize[]> {
    return this.httpClient.get<variantSize[]>(`${this.url}/${variantId}/sizes`);
  }
}
