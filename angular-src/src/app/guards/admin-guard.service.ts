import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '../../../node_modules/@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(
    private router: Router,
    private us: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.us.user){
      this.us.pullUser().then(() => {
        const isAdmin = this.us.user && this.us.user.is_admin;
        if (isAdmin) {
          this.router.navigate(['/' + route.routeConfig.path]);
          return true;
        }
        this.router.navigate(['/dashboard']);
        return false;
      })
    } else return true;
  }
}
