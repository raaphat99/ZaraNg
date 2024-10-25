import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable, of, tap,catchError,throwError } from "rxjs";
import { HttpClient,HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../enviroment/enviroment.prod';
import { BehaviorSubject } from 'rxjs';
import { Store } from '../viewmodels/Store';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class PaymentService{
    

     private apiUrl ='http://localhost:5250/api/Order'
     private jwtHelper = new  JwtHelperService();
     
     constructor(private httpClient: HttpClient) {}
   
     getToken(): string | null {
       return localStorage.getItem('token');
     }

     createOrder(checkout:any): Observable<any> {

      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const headers = {
        'Authorization': `Bearer ${token}`, // Add Bearer token to header
        'Content-Type': 'application/json'  // Ensure JSON content type
      };
      return this.httpClient?.post<any>(`${this.apiUrl}`, checkout , {headers}).pipe(
        catchError((error) => {
        
          return throwError(() => error); // Ensure observable stream handles error properly
        })
      )
          
        }
      
    }

