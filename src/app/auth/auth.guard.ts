import { Injectable } from '@angular/core';
import {  CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService:AuthService, private router:Router){

  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean{
   
    if(this.authService.isUserAuthenticated){
      return true;
    } else{
        this.router.navigate(['/auth']);
    }

  }
  
}
