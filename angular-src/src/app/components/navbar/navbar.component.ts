import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private us: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logoutClicked(){
    this.us.logout().then(() => {this.router.navigate(['/login'])});
  }

  get title(){
    return Globals.title;
  }

}
