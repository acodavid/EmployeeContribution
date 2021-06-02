import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/models/LoginUser';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  loginUser({value}) {
    
    this.userService.login(value).subscribe(
      result => {
        this.userService.storeUserData(result.token, result.user);
      }, error => {
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
