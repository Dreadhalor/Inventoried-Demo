import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  error_message: string = null;

  constructor(
    private us: UserService
  ) { }

  ngOnInit() {
  }

  isFormValid(){
    if (this.email){
      if (this.password){
        return {valid: true};
      } else return {
        valid: false,
        error: 'Password is required.'
      };
    } else return {
      valid: false,
      error: 'Email is required.'
    };
  }

  submitAttempt(form: NgForm){
    let valid = this.isFormValid();
    if (valid.valid){
      let credentials = {
        email: this.email,
        password: this.password
      };
      this.us.login(credentials).then((token) => {
        if (token){
          this.error_message = null;
          form.reset();
        } else this.error_message = 'Incorrect username or password.'
      })
    } else if (valid.error){
      this.error_message = valid.error;
    }
  }
}
