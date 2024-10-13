import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService {

  constructor(httpClient: HttpClient) { 
    super("http://localhost:5250/api/Category/main-categories", httpClient);
  }



  getSub() {
    return this.httpClient.get<any>(`${this.url}`);
}

}
