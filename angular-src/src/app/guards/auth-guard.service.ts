import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private us: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.us.user){
      this.us.pullUser().then(() => {
        const isLoggedIn = this.us.user;
        if (isLoggedIn) {
          this.router.navigate(['/' + route.routeConfig.path]);
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      })
    } else return true;
  }

}