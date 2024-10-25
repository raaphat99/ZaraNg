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
  const token = localStorage.getItem('token');  
  const headers = { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json' };
    return this.http.post<any>(`${this.apiUrl}/notify-all`, { message} ,{headers});
  }
public  notifyUser(userId: string, message: string): Observable<any> {
  const token = localStorage.getItem('token');  
  const headers = { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json' };
    return this.http.post<any>(`${this.apiUrl}`, { userId, message },{headers}).pipe();
  }
}
