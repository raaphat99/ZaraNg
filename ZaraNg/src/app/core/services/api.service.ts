import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

export class ApiService {

constructor(public url: string, public httpClient: HttpClient) {}

    getAll() {
        return this.httpClient.get<any>(this.url);
        // .pipe(
        //     map(response => response.$values)  // Extract the actual product array
        // );
    }

    getByID(id: any) {
        return this.httpClient.get<any>(`${this.url}/${id}`);
    }

    create(resource: any) {
        return this.httpClient
        .post<any>(this.url, JSON.stringify(resource));
    }

    update(resource: any) {
        return this.httpClient.put<any>(`${this.url}/${resource.id}`, resource);
    }

    delete(id: any) {
        return this.httpClient.delete<any>(`${this.url}/${id}`);
    }

}
