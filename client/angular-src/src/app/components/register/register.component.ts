import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  first_name: string = '';
  last_name: string = '';
  password: string = '';
  password_check: string = '';
  error_message = null;

  constructor(
    private us: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  resetErrors(){
    this.error_message = null;
  }

  submitAttempt(form: NgForm){
    if (this.email != ''){
      if (this.first_name != ''){
        if (this.last_name != ''){
          if (this.password != ''){
            if (this.password == this.password_check){
              let new_user_params = {
                email: this.email,
                first_name: this.first_name,
                last_name: this.last_name,
                password: this.password
              };
              this.us.registerUser(new_user_params).then((registered) => {
                if (registered){
                  form.reset();
                  this.resetErrors();
                  this.router.navigate(['/login']);
                }
              });
            } else this.error_message = "Both password fields must match.";
          } else this.error_message = "Password is required.";
        } else this.error_message = "Last name is required.";
      } else this.error_message = "First name is required.";
    } else this.error_message = "Email is required.";
  }

}
