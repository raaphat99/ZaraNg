import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService extends ApiService {

  constructor(httpClinet: HttpClient, private authService: AuthService) { 
    super("http://localhost:5250/api/UserAddress", httpClinet)
  }

  getUserAddresses() : Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.httpClient.get<any>(`${this.url}`, { headers: headers });
  }
}
