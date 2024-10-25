import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Notification } from '../viewmodels/Notification';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtPayload } from '../viewmodels/JwtPayload';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends ApiService {
  private jwtHelper = new JwtHelperService();

  constructor(httpClient: HttpClient) {
    super(`http://localhost:5250/api/Notification`, httpClient);
  }

  private extractUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        return decoded.sid || '';
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return '';
  }

  getNotifications(): Observable<Notification[]> {
    const userId = this.extractUserIdFromToken();
    if (!userId) {
      console.error('User ID not found');
      return throwError(() => new Error('User ID not found'));
    }

    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.httpClient.get<Notification[]>(`${this.url}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching notifications:', error);
        return throwError(error);
      })
    );
  }

  markAsRead(notificationId: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const markAsReadUrl = `${this.url}/mark-read/${notificationId}`;

    return this.httpClient.put<void>(markAsReadUrl, {}, { headers }).pipe(
      catchError((error) => {
        console.error('Error marking notification as read:', error);
        return throwError(error);
      })
    );
  }
}
