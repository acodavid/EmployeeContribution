import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../../data/models/LoginUser';
import { UserService } from '../../data/services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  private sub: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) { 
    this.composeForm();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if(this.sub){
      this.sub.unsubscribe();
    }  
  } 

  composeForm(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
    
  }

  loginUser() {

    this.user = this.loginForm.value;
    
    this.sub = this.userService.login(this.user).subscribe(
      data => {
        // console.log(data)
        this.userService.storeUserToken(data.token, data.user);
      }, error => {

        // console.log(error)

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
