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
export class MeasurementService extends ApiService {

  private apiUrl: string = environment.apiUrl;

  constructor(httpClient: HttpClient, private authService: AuthService) {
    super('http://localhost:5250/api/UserMesurments', httpClient);
  }

  addMeasurement(measurementData: UserMeasurement): Observable<UserMeasurement> {
    const headers = this.authService.getAuthHeaders();
    return this.httpClient.post<UserMeasurement>(`http://localhost:5250/api/UserMesurments`, measurementData, { headers });
}
}
