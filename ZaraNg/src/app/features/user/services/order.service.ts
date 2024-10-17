import { ApiService } from '../../../core/services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { OrderDetails } from '../viewmodels/OrderDetails';
import { jwtDecode } from 'jwt-decode';
import { Order } from '../viewmodels/purchases';
import { JwtPayload } from '../viewmodels/JwtPayload';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends ApiService {
  private userId: string;

  constructor(httpClient: HttpClient) {
    super('', httpClient);
    const token = localStorage.getItem('token');
    this.userId = token ? this.extractUserIdFromToken(token) : '';
    console.log('User ID:', this.userId);
    this.url = `http://localhost:5250/api/Order`;
  }

  private extractUserIdFromToken(token: string): string {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      console.log('Decoded Token:', decoded);

      if (decoded.sid) {
        console.log('Extracted User ID:', decoded.sid);
        return decoded.sid;
      } else {
        console.error('User ID not found in the token');
        return '';
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return '';
    }
  }

  private jwtHelper = new JwtHelperService();

  getOrders(): Observable<Order[]> {
    const token = localStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token)) {
      console.error('Token has expired');
      return throwError(() => new Error('Token has expired'));
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${this.url}`;
    return this.httpClient.get<Order[]>(url, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching orders:', error);
        return throwError(error);
      })
    );
  }

  getOrderDetails(trackingNumber: string): Observable<OrderDetails> {
    const encodedTrackingNumber = encodeURIComponent(trackingNumber);
    const urlTrack = `${this.url}/tracking/${encodedTrackingNumber}`;

    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.httpClient.get<OrderDetails>(urlTrack, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching order details:', error);
        return throwError(error);
      })
    );
  }
}
