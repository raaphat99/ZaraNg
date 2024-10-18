import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private apiUrl = 'http://localhost:5250/api/statistics';

  constructor(private http: HttpClient) {}

  getOrdersCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/orders/count`);
  }

  getProductsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/products/count`);
  }

  getCategoriesCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/categories/count`);
  }

  getUsersCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/users/count`);
  }}
