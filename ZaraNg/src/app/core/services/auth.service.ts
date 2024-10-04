import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
isAuthenticated?: boolean = false;
redirectUrl: any;

  constructor(private jwtHelper: JwtHelperService) {}

  login(credintials: any) : Observable<boolean> {
    let jwt: string =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFobWVkIFJhYWZhdCIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjJ9.jgs8rZAbPT2ywPwG-oEe8jGiHqZCzagOc11gGX6BiBg";

    if (credintials.email === "ahmed@gmail.com" && credintials.password === "1999") {
      localStorage.setItem("token", jwt);
      this.isAuthenticated = true;
      return of(true);
    } 

    return of(false);
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
