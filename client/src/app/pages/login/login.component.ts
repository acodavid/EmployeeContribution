import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../../data/models/LoginUser';
import { UserService } from '../../data/services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  user: LoginUser = {
    email: '',
    password: ''
  }

  errors = {
    email: '',
    password: ''
  }

  // password field changer
  hide: boolean = true

  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) { 
    this.composeForm();
  }

  ngOnInit(): void {
  }

  composeForm(): void {

    this.loginForm = new FormGroup({
      email: new FormControl(this.user.email, Validators.required),
      password: new FormControl(this.user.password, Validators.required)
    })
    
  }

  loginUser() {

    this.user = this.loginForm.value;
    
    this.userService.login(this.user).subscribe(
      result => {
        this.userService.storeUserToken(result.token, result.user);
      }, error => {

        if(error.error.email) {
          this.loginForm.get('email').setErrors({'valid': false});
        }
        
        if(error.error.password) {
          this.loginForm.get('password').setErrors({'valid': false});
        }

        
        this.errors = error.error;

      }, () => {
        this.user = {
          email: '',
          password: ''
        }

        this.errors = {
          email: '',
          password: ''
        }
        this.router.navigate(['/']);
        
      }
    )
    
  }

}
