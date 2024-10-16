import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService extends ApiService {
  constructor(httpClient: HttpClient) { 
    super("http://localhost:5250/api/Category/main-categories", httpClient);
  }
}
