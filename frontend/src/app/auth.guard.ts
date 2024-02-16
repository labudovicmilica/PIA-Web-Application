import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!sessionStorage.getItem("ulogovan")){
        return false;
      }
      if(route.data["uloga"]=="svi"){
        return true;
      }
      if(route.data["uloga"] == sessionStorage.getItem("uloga")){
        return true;
      }
      return this.router.navigate(['nelegalno']);

  }
  
}
