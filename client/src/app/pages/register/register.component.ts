import { Component, OnInit } from '@angular/core';
import { UserService } from '../../data/services/user.service';
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UserRegister } from 'src/app/data/models/UserRegister';
import * as moment from 'moment';

// import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// import * as _moment from 'moment';

// const moment = _moment;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})



export class RegisterComponent implements OnInit {

  // password field changer
  hide: boolean = true

  errors = {
    email: '',
    password: '',
    name: '',
    dateOfBirth: '',
    typeOfPosition: '',
    hiredDate: '',
    contractDuration: '',
    terminationDate: '',
    orgLevel: '',
    status: '',
    durationOfPreviousService: ''
  }

  user: UserRegister = {
    name: '',
    email: '',
    password: '',
    isAdmin: false,
    dateOfBirth: '',
    typeOfPosition: '',
    hiredDate: '',
    contractDuration: '',
    terminationDate: '',
    orgLevel: '',
    status: '',
    durationOfPreviousService: '',
    linkToPersonalFolder: ''
  };
  
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
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      isAdmin: new FormControl(false, Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      typeOfPosition: new FormControl('', Validators.required),
      hiredDate: new FormControl('', Validators.required),
      contractDuration: new FormControl('', Validators.required),
      terminationDate: new FormControl('', Validators.required),
      orgLevel: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      durationOfPreviousService: new FormControl('', Validators.required),
      linkToPersonalFolder: new FormControl('')
    })
    
  }

  /* Date */
  date(e, name) {

    let convertDate;

    convertDate = moment(e.target.value._d).add(3, 'hours')
    
    this.registerForm.get(name).setValue(convertDate._d, {
      onlyself: true
    })

    
  }



  registerUser() {

    this.user = this.registerForm.value;
    
    this.user.durationOfPreviousService = this.user.durationOfPreviousService.toString();

    this.userService.registerUser(this.user).subscribe(result => {
      console.log('Registrated!')
    }, error => {

      if(error.error.name) {
        this.registerForm.get('name').setErrors({'valid': false});
      }

      if(error.error.email) {
        this.registerForm.get('email').setErrors({'valid': false});
      }

      if(error.error.password) {
        this.registerForm.get('password').setErrors({'valid': false});
      }

      if(error.error.dateOfBirth) {
        this.registerForm.get('dateOfBirth').setErrors({'valid': false});
      }

      if(error.error.typeOfPosition) {
        this.registerForm.get('typeOfPosition').setErrors({'valid': false});
      }

      if(error.error.hiredDate) {
        this.registerForm.get('hiredDate').setErrors({'valid': false});
      }

      if(error.error.contractDuration) {
        this.registerForm.get('contractDuration').setErrors({'valid': false});
      }

      if(error.error.terminationDate) {
        this.registerForm.get('terminationDate').setErrors({'valid': false});
      }

      if(error.error.orgLevel) {
        this.registerForm.get('orgLevel').setErrors({'valid': false});
      }

      if(error.error.status) {
        this.registerForm.get('status').setErrors({'valid': false});
      }

      if(error.error.durationOfPreviousService) {
        this.registerForm.get('durationOfPreviousService').setErrors({'valid': false});
      }

      this.errors = error.error;
    }, () => {
      this.user = {
        name: '',
        email: '',
        password: '',
        isAdmin: false,
        dateOfBirth: '',
        typeOfPosition: '',
        hiredDate: '',
        contractDuration: '',
        terminationDate: '',
        orgLevel: '',
        status: '',
        durationOfPreviousService: '',
        linkToPersonalFolder: ''
      }
      this.errors = {
        email: '',
        password: '',
        name: '',
        dateOfBirth: '',
        typeOfPosition: '',
        hiredDate: '',
        contractDuration: '',
        terminationDate: '',
        orgLevel: '',
        status: '',
        durationOfPreviousService: ''
      }
      this.router.navigate(['/employees']);
    })
    
  }

}
