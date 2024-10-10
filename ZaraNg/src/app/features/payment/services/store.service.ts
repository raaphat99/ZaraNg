import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { environment } from '../../../../enviroment/enviroment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Store } from '../viewmodels/Store';
import { zaraStores } from '../static-data/zara-stores';

@Injectable({
  providedIn: 'root',
})
export class StoreService extends ApiService {
  private apiUrl: string = environment.apiUrl;
  stores: Store[] = zaraStores;

  constructor(httpClient: HttpClient) {
    super(environment.apiUrl, httpClient);
  }

  filterStoresByLocation(location: string): Observable<Store[]> {
    return of(
      this.stores.filter(
        (store) =>
          store.address.toLowerCase().includes(location.toLowerCase()) ||
          store.city.toLowerCase().includes(location.toLowerCase()) ||
          store.country.toLowerCase().includes(location.toLowerCase())
      )
    );
  }

  getStoresByLocation(location: string): Observable<Store[]> {
    return this.httpClient.get<Store[]>(`${this.apiUrl}?location=${location}`);
  }

}
