import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiService {

  constructor(httpClient: HttpClient) {
    super("API Endpoint Url", httpClient);
  }
}
