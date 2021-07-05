import { Component, OnInit } from '@angular/core';
import { UserService } from '../../data/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UserRegister } from 'src/app/data/models/UserRegister';
import * as moment from 'moment';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

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

  dateOfBirth;
  hiredDate;
  terminationDate;

  user: UserRegister;

  idFromParam: string;

  updateUserForm: FormGroup;

  private sub1: any;
  private sub2: any;
  private sub3: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.composeForm();
  }

  ngOnInit(): void {

    this.sub1 = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.idFromParam = id;

      this.sub2 = this.userService.getUserById(this.idFromParam).subscribe(user => {
      
        const {name, email, isAdmin, dateOfBirth, typeOfPosition, hiredDate,
        contractDuration, terminationDate, orgLevel, status, durationOfPreviousService,
      linkToPersonalFolder} = user;

      this.dateOfBirth = moment(dateOfBirth);
      

      this.hiredDate = moment(hiredDate);
      

      this.terminationDate = moment(terminationDate);
      

        

      this.updateUserForm.setValue({
        name,
        email,
        isAdmin,
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
    })
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
  } 

  composeForm(): void {

    

    this.updateUserForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      isAdmin: new FormControl('', Validators.required),
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
    
    this.updateUserForm.get(name).setValue(convertDate._d, {
      onlyself: true
    })
  }

  updateUser() {
    this.user = this.updateUserForm.value;
    this.user.durationOfPreviousService = this.user.durationOfPreviousService.toString();

    this.user._id = this.idFromParam;

    this.sub3 = this.userService.updateUser(this.user).subscribe(result => {
      console.log('Updated');
    }, error => {
      if(error.error.name) {
        this.updateUserForm.get('name').setErrors({'valid': false});
      }

      if(error.error.email) {
        this.updateUserForm.get('email').setErrors({'valid': false});
      }

      if(error.error.dateOfBirth) {
        this.updateUserForm.get('dateOfBirth').setErrors({'valid': false});
      }

      if(error.error.typeOfPosition) {
        this.updateUserForm.get('typeOfPosition').setErrors({'valid': false});
      }

      if(error.error.hiredDate) {
        this.updateUserForm.get('hiredDate').setErrors({'valid': false});
      }

      if(error.error.contractDuration) {
        this.updateUserForm.get('contractDuration').setErrors({'valid': false});
      }

      if(error.error.terminationDate) {
        this.updateUserForm.get('terminationDate').setErrors({'valid': false});
      }

      if(error.error.orgLevel) {
        this.updateUserForm.get('orgLevel').setErrors({'valid': false});
      }

      if(error.error.status) {
        this.updateUserForm.get('status').setErrors({'valid': false});
      }

      if(error.error.durationOfPreviousService) {
        this.updateUserForm.get('durationOfPreviousService').setErrors({'valid': false});
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
