import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';


export interface UserAddressDTO {
  id?: number;
  name?: string;
  phoneNumber: string;
  country: string;
  state: string;
  area: string;
  city: string;
  street: string;
  active?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class UserAddressesService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:5250/api/UserAddress';

 // Method to get all Adresses for a user
GetUserAddresses(): Observable<UserAddressDTO[]> {
  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}` };
  return this.http.get<UserAddressDTO[]>(`${this.apiUrl}`, {
    headers 
  }).pipe(
    catchError(this.handleError)
  );
}

// Method to add a new Adress 
CreateUserAddress(address : UserAddressDTO): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}` };
  return this.http.post<any>(`${this.apiUrl}`,address, {
    headers, 
    observe: 'response'
  }).pipe(
    tap((response) => {
      console.log(response);
      console.log('User address created successfully');
    }),
    catchError(this.handleError)
  );
}

// Method to update an Adress
UpdateUserAddress(address : UserAddressDTO): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}` };
  return this.http.put<any>(`${this.apiUrl}`,address, {
    headers, 
    observe: 'response'
  }).pipe(
    tap((response) => {
      console.log(response);
      console.log('User address updated successfully');
    }),
    catchError(this.handleError)
  );
}

// Method to delete an Adress
DeleteUserAddress(addressId : number | undefined): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}` };
  return this.http.delete<any>(`${this.apiUrl}/${addressId}`, {
    headers, 
    observe: 'response'
  }).pipe(
    tap((response) => {
      console.log(response);
      console.log('User address deleted successfully');
    }),
    catchError(this.handleError)
  );
}


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 404:
          errorMessage = error.error || 'Not found. The item might be out of stock.';
          break;
        case 405:
          errorMessage = 'Method Not Allowed. Please check the API endpoint and HTTP method.';
          break;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

}
