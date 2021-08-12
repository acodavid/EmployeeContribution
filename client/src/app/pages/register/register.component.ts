import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../data/services/user.service';
import { Router, ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UserRegister } from 'src/app/data/models/UserRegister';
import * as moment from 'moment';
import { PositionServiceService } from 'src/app/data/services/position-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})



export class RegisterComponent implements OnInit, OnDestroy {

  // password field changer
  hide: boolean = true

  // param
  param: string;

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
    type: '',
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

  dateOfBirth;
  hiredDate;
  terminationDate;
  
  registerForm: FormGroup;

  private sub1: any;
  private sub2: any;
  private sub3: any;
  private sub4: any;

  positions: any;

  

  constructor(
    public userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private positionService: PositionServiceService

  ) { 
    this.composeForm();
   }
  

  ngOnInit(): void {
    
    // If it is not the admin, navigate to not found
   
    this.sub3 = this.activatedRoute.params.subscribe(params => {

      const id = params['id'];
      this.param = id;

      this.positionService.getPositions().subscribe(positions => {
        this.positions = positions;
      })

      if(this.param === 'register') {
        
        this.sub1 = this.userService.getCurrentUser().subscribe(user => {
          if(!this.userService.checkAdmin()) {
            this.router.navigate(['/not-found'])

          }
        })
      } else {

        // for update user
        this.sub4 = this.userService.getUserById(this.param).subscribe(user => {

          const {name, email, type, password, dateOfBirth, typeOfPosition, hiredDate,
            contractDuration, terminationDate, orgLevel, status, durationOfPreviousService,
          linkToPersonalFolder} = user;

          this.dateOfBirth = moment(dateOfBirth);
      

          this.hiredDate = moment(hiredDate);
      
          if(user.terminationDate) {
            this.terminationDate = moment(terminationDate);

            this.registerForm.setValue({
              name,
              email,
              type,
              password,
              dateOfBirth,
              hiredDate,
              terminationDate,
              typeOfPosition,
              contractDuration,
              orgLevel,
              status, 
              durationOfPreviousService, 
              linkToPersonalFolder
            })
          } else {
            this.terminationDate = '';

            this.registerForm.setValue({
              name,
              email,
              type,
              password,
              dateOfBirth,
              hiredDate,
              terminationDate: '',
              typeOfPosition,
              contractDuration,
              orgLevel,
              status, 
              durationOfPreviousService, 
              linkToPersonalFolder
            })
          }

        })
      }

    })


    
  }

  ngOnDestroy() {
    if(this.sub1){
      this.sub1.unsubscribe();
    }

    if(this.sub2) {
      this.sub2.unsubscribe();
    }

    if(this.sub3) {
      this.sub3.unsubscribe();
    }

    if(this.sub4) {
      this.sub4.unsubscribe();
    }
    
  } 

  composeForm(): void {
    

    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      type: new FormControl('user', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      typeOfPosition: new FormControl('', Validators.required),
      hiredDate: new FormControl('', Validators.required),
      contractDuration: new FormControl('', Validators.required),
      terminationDate: new FormControl(''),
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

    this.sub2 = this.userService.registerUser(this.user).subscribe(result => {
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
        type: '',
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

  updateUser() {
    this.user = this.registerForm.value;

    this.user.durationOfPreviousService = this.user.durationOfPreviousService.toString();

    this.user._id = this.param;

    this.sub3 = this.userService.updateUser(this.user).subscribe(result => {
      console.log('Updated');
    }, error => {
      if(error.error.name) {
        this.registerForm.get('name').setErrors({'valid': false});
      }

      if(error.error.email) {
        this.registerForm.get('email').setErrors({'valid': false});
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
        type: '',
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
