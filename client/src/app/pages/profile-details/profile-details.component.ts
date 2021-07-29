import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { windowWhen } from 'rxjs/operators';
import { UserRegister } from 'src/app/data/models/UserRegister';
import { UserService } from 'src/app/data/services/user.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {

  user: UserRegister;

  private sub1: any;
  private sub2: any;

  public loading: boolean = true;

  public showForm: boolean = false;

  errors = {
    name: '',
    dateOfBirth: ''
  }

  profileForm: FormGroup;


  dateOfBirth;
  name: string;

  constructor(
    private userService: UserService
  ) { 
    this.composeForm();
  }

  ngOnInit(): void {

    this.sub1 = this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.dateOfBirth = user.dateOfBirth;

      

      this.user.dateOfBirth = this.user.dateOfBirth.slice(8, 10) + '.' + this.user.dateOfBirth.slice(5, 7) + '.' + this.user.dateOfBirth.slice(0, 4)
      this.user.hiredDate = this.user.hiredDate.slice(8, 10) + '.' + this.user.hiredDate.slice(5, 7) + '.' + this.user.hiredDate.slice(0, 4)
      this.user.terminationDate = this.user.terminationDate.slice(8, 10) + '.' + this.user.terminationDate.slice(5, 7) + '.' + this.user.terminationDate.slice(0, 4)

      this.profileForm.setValue({
        name: user.name,
        dateOfBirth: this.dateOfBirth
      })

      this.loading = false
      
    })

    

  }

  ngOnDestroy(): void {
    if(this.sub1){
      this.sub1.unsubscribe();
    }

    if(this.sub2) {
      this.sub2.unsubscribe();
    }

   
    
  } 

  composeForm(): void {
    this.profileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required)
    })
  }

  date(e, name) {

    let convertDate;

    convertDate = moment(e.target.value._d).add(3, 'hours')
    
    this.profileForm.get(name).setValue(convertDate._d, {
      onlyself: true
    })

    
  }

  changeData() {

    const {name, dateOfBirth} = this.profileForm.value;

    const data = {
      id: this.user._id,
      name,
      dateOfBirth: new Date(dateOfBirth)
    }

    
    console.log(data)

    this.sub2 = this.userService.changePersonalData(data).subscribe(result => {
      console.log('success')
    })

    window.location.reload();


  }

  changeShowForm(): void {

    this.showForm = !this.showForm;

    console.log(this.dateOfBirth)

  }


}
