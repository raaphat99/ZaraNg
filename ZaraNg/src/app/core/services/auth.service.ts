import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, of, tap,catchError,throwError } from "rxjs";
import { HttpClient,HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { errorContext } from "rxjs/internal/util/errorContext";

@Injectable({
  providedIn: "root",
})
export class AuthService {
isAuthenticated?: boolean = false;
redirectUrl: any;
private apiUrl ='http://localhost:5250/api/Authenticate'
  constructor(
    private httpClient: HttpClient
  ) {}
  private jwtHelper = new  JwtHelperService();


  login( email: string, password: string ) : Observable<any> {

    return this.httpClient?.post<any>(`${this.apiUrl}/login `,{ email, password }).pipe(
      tap((response)=>{
        localStorage.setItem("token", response.token)
        this.isAuthenticated = true;
      }),
      catchError(this.handleError)
    )
    // let jwt: string =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFobWVkIFJhYWZhdCIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjJ9.jgs8rZAbPT2ywPwG-oEe8jGiHqZCzagOc11gGX6BiBg";

    // if (credintials.email === "ahmed@gmail.com" && credintials.password === "1999") {
    //   localStorage.setItem("token", jwt);
    //   this.isAuthenticated = true;
    //   return of(true);
    // } 

    // return of(false);
  }
  register(email: string, password: string, name: string, surname: string): Observable<any> {

    return this.httpClient?.post<any>(`${this.apiUrl}/register`,{ email, password, name, surname },{observe: 'response' }).pipe(
      tap((response)=>{
        this.login(email, password);
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
    console.log(response);
  }),
  catchError((error) => {
  
    return throwError(() => error); // Ensure observable stream handles error properly
  })
));
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
}
