import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService {

  constructor(httpClient: HttpClient) { 
    super("http://localhost:5250/api/Category/main-categories", httpClient);
  }

  hasBeautyAncestor(categoryId: number): Observable<boolean> {
    return this.httpClient.get<string>(`http://localhost:5250/api/Category/${categoryId}/has-beauty-ancestor`, { responseType: 'text' as 'json' })
    .pipe(
      map(response => response === 'true'), // Convert the string response ('true' or 'false') to a boolean
      catchError(this.handleError)          // Error handling
    );
  
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // A server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getSub() {
    return this.httpClient.get<any>(`${this.url}`);
}

}
