import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, of, tap,catchError,throwError, BehaviorSubject } from "rxjs";
import { HttpClient,HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { errorContext } from "rxjs/internal/util/errorContext";
import { UserDTO } from "../../features/admin-dashboard/viewmodels/userdata";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  redirectUrl: string | null = null;
  private userRoleSubject = new BehaviorSubject<string | null>(null);
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
  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        console.log('Login response:', response); 
        localStorage.setItem('role', response.role);
        localStorage.setItem("token", response.token);
      }),
      catchError(this.handleError)
    );
  }

  
  register(email: string, password: string, name: string, surname: string): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/register`,
      { email, password, name, surname },
      { observe: 'response' }
    ).pipe(
      tap(() => {
        this.login(email, password);
      })
    );
  }
  registerAdmin(email: string, password: string, name: string, surname: string): Observable<any> {
    const header= this.getAuthHeaders();
      return this.httpClient?.post<any>(`${this.apiUrl}/register-admin`,{ email, password, name, surname },{headers:header, observe: 'response' }).pipe(
        tap((response)=>{
          
        })
      )
    }


  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const roles = decodedToken.role || decodedToken['role'] || decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return roles === 'Admin';
    }
    return false;
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
  changeEmail(Password: string, NewEmail: string): Observable<any> {
    const token = localStorage.getItem('token');
    const body = { Password, NewEmail };
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.httpClient.put<any>(this.apiUrl, body, { headers, observe: 'response' }).pipe(
      tap((response) => console.log(response)),
      catchError(this.handleError)
    );
  }
changePassword(OldPassword: string, NewPassword: string): Observable<any> {
  const token = localStorage.getItem('token');
  const body = { OldPassword, NewPassword };
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  return this.httpClient.put<any>(`${this.apiUrl}/change-password`, body, { headers, observe: 'response' }).pipe(
    tap((response) => console.log(response)),
    catchError(this.handleError)
  );
}
deleteAccount(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  return this.httpClient.delete<any>(this.apiUrl, { headers, observe: 'response' }).pipe(
    tap((response) => {
      if (response && response.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.userRoleSubject.next(null);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('Error deleting account:', error.message);
      let errorMessage = 'An error occurred while deleting the account.';
      if (error.status === 500) {
        errorMessage = 'Server error: Please try again later.';
      } else if (error.status === 404) {
        errorMessage = 'Account not found.';
      }
      return throwError(() => new Error(errorMessage));
    })
  );
}
get currentUser() {
  const token = localStorage.getItem('token');
  if (token && !this.jwtHelper.isTokenExpired(token)) {
    return this.jwtHelper.decodeToken(token);
  }
  return null;
}
logout(): void {
  localStorage.removeItem("token");
  localStorage.removeItem('role');
  this.userRoleSubject.next(null); 
}
  getUserName(): string | null {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return `${decodedToken.name}`;
    }
    return null;
  }
  getUserRole(): string | null {
    console.log('Stored role:', localStorage.getItem('role'));
    return localStorage.getItem('role');

  }
  getEmailFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken.email || null;
      } catch (error) {
        console.error('Error decoding token', error);
        return null;
      }
    }
    return null;
  }
   // isAuthenticated?: boolean = false;
  //redirectUrl: any;
// login( email: string, password: string ) : Observable<any> {

  //   return this.httpClient?.post<any>(`${this.apiUrl}/login `,{ email, password }).pipe(
  //     tap((response)=>{
  //       localStorage.setItem("token", response.token)
  //       this.isAuthenticated = true;
  //     }),
  //     catchError(this.handleError)
  //   )
  //   // let jwt: string =
  //   //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFobWVkIFJhYWZhdCIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjJ9.jgs8rZAbPT2ywPwG-oEe8jGiHqZCzagOc11gGX6BiBg";

  //   // if (credintials.email === "ahmed@gmail.com" && credintials.password === "1999") {
  //   //   localStorage.setItem("token", jwt);
  //   //   this.isAuthenticated = true;
  //   //   return of(true);
  //   // } 

  //   // return of(false);
  // }
  // register(email: string, password: string, name: string, surname: string): Observable<any> {

  //   return this.httpClient?.post<any>(`${this.apiUrl}/register`,{ email, password, name, surname },{observe: 'response' }).pipe(
  //     tap((response)=>{
        
  //     })
  //   )
  // }
  //   get currentUser() {
//     let token;

//     if (typeof window !== 'undefined') 
//       token = localStorage.getItem('token');

//     if (!token) 
//       return null;
    
//     return this.jwtHelper.decodeToken(token);
//   }

//   logout() {
//     localStorage.removeItem("token");
//     this.isAuthenticated = false;
    
//   }
// deleteAccount(): Observable<any> {
//   const token = localStorage.getItem('token');
//   return this.httpClient?.delete<any>(this.apiUrl, { headers: { 'Authorization': `Bearer ${token}` } ,observe: 'response'}).pipe(( tap((response)=>{
    
//     if (response) {
//       localStorage.removeItem('token');
//       this.isAuthenticated = false;
//     }
//   })));
// }

}
