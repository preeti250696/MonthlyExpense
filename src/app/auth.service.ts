import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   isUserAuthenticated = false;
   get userisAuthenticated(){
     return this.isUserAuthenticated;
   }
  constructor(private http:HttpClient) { }
  signup(email:string, password:string){
   return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,{email:email, password:password,returnSecureToken:true}).pipe(tap(()=>{
      this.isUserAuthenticated = true;
   }))
  }

  signIn(email:string, password:string){
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`, {email:email, password:password, returnSecureToken:true}).pipe(tap(()=>{
      this.isUserAuthenticated = true;
    }))
  }

}
