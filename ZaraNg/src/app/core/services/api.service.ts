import { HttpClient } from '@angular/common/http';

export class ApiService {

  constructor(private url: string, private httpClient: HttpClient) {}

    getAll() {
        return this.httpClient.get<any>(this.url);
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
