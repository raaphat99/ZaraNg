import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroment/enviroment.prod';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { UserMeasurement } from '../viewmodels/user-measurement';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserMeasurementService extends ApiService {

  private apiUrl: string = environment.apiUrl;

  constructor(httpClient: HttpClient, private authService: AuthService) {
    super('http://localhost:5250/api/UserMesurments', httpClient);
  }

  getUserMeasurements(): Observable<UserMeasurement[]> {
    var headers = this.authService.getAuthHeaders();
    return this.httpClient.get<UserMeasurement[]>(`${this.url}`, { headers });
  }

  addMeasurement(measurementData: UserMeasurement): Observable<UserMeasurement> {
    const headers = this.authService.getAuthHeaders();
    return this.httpClient.post<UserMeasurement>(`http://localhost:5250/api/UserMesurments`, measurementData, { headers });
}
}
