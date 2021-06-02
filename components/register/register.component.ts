import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    email: '',
    password: '',
    isAdmin: false
  };

  errors = {
    email: '',
    password: ''
  };

  @ViewChild('registerForm') form: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registerUser({value}: {value: User}) {
    // Value is the data from the form

  
      // registration of user
      this.userService.registerUser(value).subscribe(result => {
        console.log('Registration succesfull!')
        
      }, error => {
        this.errors = error.error;
      }, () => {
        this.user = {
          email: '',
          password: '',
          isAdmin: false
        }

        this.errors = {
          email: '',
          password: ''
        }
        this.router.navigate(['/']);
      })


  }

}
