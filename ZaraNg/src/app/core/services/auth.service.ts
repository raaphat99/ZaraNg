import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, of, tap,catchError,throwError } from "rxjs";
import { HttpClient,HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { errorContext } from "rxjs/internal/util/errorContext";
import { UserDTO } from "../../features/admin-dashboard/viewmodels/userdata";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isAuthenticated?: boolean = false;
  redirectUrl: any;
  private apiUrl ='http://localhost:5250/api/Authenticate'
  private jwtHelper = new  JwtHelperService();
  
  constructor(private httpClient: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getCustomerData(): Observable<UserDTO[]> {
    const token = this.getToken();
    return this.httpClient.get<UserDTO[]>(`${this.apiUrl}`, {
      headers: this.getAuthHeaders(),
    });
  }
  login( email: string, password: string ) : Observable<any> {

    return this.httpClient?.post<any>(`${this.apiUrl}/login `,{ email, password }).pipe(
      tap((response)=>{
        localStorage.setItem("token", response.token)
        this.isAuthenticated = true;
      }),
      catchError(this.handleError)
    )

  }
  register(email: string, password: string, name: string, surname: string): Observable<any> {

    return this.httpClient?.post<any>(`${this.apiUrl}/register`,{ email, password, name, surname },{observe: 'response' }).pipe(
      tap((response)=>{
        
      })
    )
  }
registerAdmin(email: string, password: string, name: string, surname: string): Observable<any> {
const header= this.getAuthHeaders();
  return this.httpClient?.post<any>(`${this.apiUrl}/register-admin`,{ email, password, name, surname },{headers:header, observe: 'response' }).pipe(
    tap((response)=>{
      
    })
  )
}
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.status === 401) {
      errorMessage = 'Invalid email or password.';
    } else if (error.status === 400) {
      errorMessage = 'Bad request. Please check your input.';
    }
    return throwError(() => new Error(errorMessage));
  }
  changeEmail(Password: string,NewEmail: string): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    console.log(token);
    const body = { Password, NewEmail };
    const headers = {
      'Authorization': `Bearer ${token}`, // Add Bearer token to header
      'Content-Type': 'application/json'  // Ensure JSON content type
    };
    return this.httpClient?.put<any>(this.apiUrl,body, {headers, observe: 'response'}).pipe((tap((response)=>{
      console.log(response);
    }),
    catchError((error) => {
    
      return throwError(() => error); // Ensure observable stream handles error properly
    })
  ));
}
changePassword(OldPassword: string,NewPassword: string): Observable<any> {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  console.log(token);
  const body = { OldPassword, NewPassword };
  const headers = {
    'Authorization': `Bearer ${token}`, // Add Bearer token to header
    'Content-Type': 'application/json'  // Ensure JSON content type
  };
  return this.httpClient?.put<any>(`${this.apiUrl}/change-password`,body, {headers, observe: 'response'}).pipe((tap((response)=>{
    ;
  }),
  catchError((error) => {
  
    return throwError(() => error); // Ensure observable stream handles error properly
  })
));
}
deleteAccount(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.httpClient?.delete<any>(this.apiUrl, { headers: { 'Authorization': `Bearer ${token}` } ,observe: 'response'}).pipe(( tap((response)=>{
    
    if (response) {
      localStorage.removeItem('token');
      this.isAuthenticated = false;
    }
  })));
}
  get currentUser() {
    let token;

    if (typeof window !== 'undefined') 
      token = localStorage.getItem('token');

    if (!token) 
      return null;
    
    return this.jwtHelper.decodeToken(token);
  }

  logout() {
    localStorage.removeItem("token");
    this.isAuthenticated = false;
    
  }
  getUserName(): string | null {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return `${decodedToken.name} `;

    }
    return null;
  }
}
