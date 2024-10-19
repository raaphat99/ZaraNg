import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../user/viewmodels/JwtPayload';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable, throwError } from 'rxjs';
import { Order } from '../../user/viewmodels/purchases';
import { UpdateOrderDTO } from '../viewmodels/UpdateOrderDTO';
import { OrderStatus } from '../viewmodels/OrderStatus';

@Injectable({
  providedIn: 'root'
})
export class OrderAdminService extends ApiService {
  private apiUrl = 'http://localhost:5250/api/AdminOrder';
  private jwtHelper = new JwtHelperService();
  constructor(httpClient: HttpClient) {
    super('', httpClient);
    this.url = `http://localhost:5250/api/AdminOrder`;
  }
  getAllOrdersForAdmin(): Observable<Order[]> {
    const token = localStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token)) {
      console.error('Token has expired');
      return throwError(() => new Error('Token has expired'));
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${this.url}/all`;
    return this.httpClient.get<Order[]>(url, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching all orders for admin:', error);
        return throwError(error);
      })
    );
  }
  // Delete an order by ID
  deleteOrder(orderId: number): Observable<void> {
    const token = localStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token)) {
      console.error('Token has expired');
      return throwError(() => new Error('Token has expired'));
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log();
    const url = `${this.url}/${orderId}`;
    return this.httpClient.delete<void>(url, { headers }).pipe(
      catchError((error) => {
        console.error(`Error deleting order with ID ${orderId}:`, error);
        return throwError(error);
      })
    );
  }
  getUsers() {
    return this.httpClient.get(`${this.apiUrl}/user`);
  }

  getProducts() {
    return this.httpClient.get(`${this.apiUrl}/product`);
  }

  getProductVariants(productId: number) {
    return this.httpClient.get(`${this.apiUrl}/${productId}/variants`);
  }

  createOrder(order: any) {
    return this.httpClient.post(`${this.apiUrl}`, order);
  }  
  updateOrder(orderId: number, orderData: UpdateOrderDTO): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${orderId}`, orderData);
  }
 
updateOrderStatus(orderId: number, newStatus: string): Observable<any> { 
    return this.httpClient.put(`http://localhost:5250/api/AdminOrder/${orderId}/status?newStatus=${newStatus}`, {});  // Sending an empty body
}


  
}
