import { Component, OnInit } from '@angular/core';
import { UserService } from '../../data/services/user.service';
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { User } from 'src/app/data/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent implements OnInit {

  errors = {
    email: '',
    password: ''
  }

  user: User = {
    email: '',
    password: '',
    isAdmin: false
  };

  currentUser = {
    id: '',
    email: '',
    isAdmin: '',
    firstLogin: false
  }
  
  registerForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router

  ) { 
    this.composeForm();
   }
  

  ngOnInit(): void {
    // If it is not the admin, navigate to not found

    this.userService.getCurrentUser().subscribe(user => {
      if(!user.isAdmin) {
        this.router.navigate(['/not-found'])
      }
    })
  }

  composeForm(): void {

    this.registerForm = new FormGroup({
      email: new FormControl(this.user.email, Validators.required),
      password: new FormControl(this.user.password, Validators.required),
      isAdmin: new FormControl(this.user.isAdmin, Validators.required)
    })
    
  }



  registerUser() {

    this.user = this.registerForm.value;

    this.userService.registerUser(this.user).subscribe(result => {
      console.log('Registrated!')
    }, error => {
      this.errors = error.error
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
