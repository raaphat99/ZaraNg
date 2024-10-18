import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:5250/api/Notification';

  constructor(private http: HttpClient) {}

 public notifyAll(message: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/notify-all`, { message });
  }
public  notifyUser(userId: string, message: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/notify-user`, { userId, message });
  }
}
