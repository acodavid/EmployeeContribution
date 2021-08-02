import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UserRegister } from 'src/app/data/models/UserRegister';
import { AbsencePresenceService } from 'src/app/data/services/absence-presence.service';
import { UserService } from 'src/app/data/services/user.service';
import { SnackComponent } from 'src/app/data/snack/snack/snack.component';

@Component({
  selector: 'app-contribution-create',
  templateUrl: './contribution-create.component.html',
  styleUrls: ['./contribution-create.component.scss']
})
export class ContributionCreateComponent implements OnInit, OnDestroy {

  errors = {
    date: '',
    workingFrom: '',
    workingTo: '',
    onPauseFrom: '',
    onPauseTo: '',
    place: '',
    date2: ''
  }

  loading: boolean = true

  contributionCreateForm: FormGroup;

  typeOfForm: string;

  users: UserRegister[];

  showError: boolean = false;

  counter: number = 0;
  counter2: number = 0;
  hasError: boolean = false;
  dates = []; 
  errorMessage: string;

  invalidDateRange: string = '';

  private sub1: any;
  private sub2: any;
  private sub3: any;


  constructor(
    private userService: UserService,
    private router: Router,
    private absencePresenceService: AbsencePresenceService,
    private _snackBar: MatSnackBar
  ) { 
    this.composeForm();
   }

  ngOnInit(): void {

    if (this.userService.checkAdmin()) {
      this.sub1 = this.userService.getUsers().subscribe(users => {
        this.users = users;
        this.loading = false
      })
    } else {
      this.router.navigate(['/not-found'])
    }

    

  }

  ngOnDestroy() {
    if(this.sub1){
      this.sub1.unsubscribe();
    }

    if(this.sub2){
      this.sub2.unsubscribe();
    }

    if(this.sub3){
      this.sub3.unsubscribe();
    }
    
  }

  composeForm(): void {
    this.contributionCreateForm = new FormGroup({
      employee: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      remoteOrOffice: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      date2: new FormControl('', Validators.required),
      workingFrom: new FormControl('', Validators.required),
      workingTo: new FormControl('', Validators.required),
      onPauseFrom: new FormControl('', Validators.required),
      onPauseTo: new FormControl('', Validators.required),
      typeOfAbsence: new FormControl('', Validators.required),
      place: new FormControl('', Validators.required)
    })
  }

  date(e, name) {

    let convertDate;

    convertDate = moment(e.target.value._d).add(3, 'hours')
    
    this.contributionCreateForm.get(name).setValue(convertDate._d, {
      onlyself: true
    })

    
  }

  onChange(e): void {
    this.typeOfForm = e.value;
  }

  createContribution(): void {

    const {employee, type, remoteOrOffice, date, date2, workingFrom, workingTo,
      onPauseFrom, onPauseTo, typeOfAbsence, place} = this.contributionCreateForm.value;

    let data;

    if(date.getTime() > date2.getTime()) {
      
      this.invalidDateRange = 'Please insert valid dates range!'

      
    } else {


      if(type === '') {

        this.showError = true
  
      } else if(type === 'Absence') {
  
        data = {
          user: employee,
          type,
          remoteOffice: '',
          date,
          date2,
          workingFrom: '',
          workingTo: '',
          onPauseFrom: '',
          onPauseTo: '',
          typeOfAbsence,
          placeOfBusinessTrip: ''
        }
  
        if(employee === '' || date === '' || date2 === '' || typeOfAbsence === '') {
          this.showError = true
        } else {
          this.create(data);
        }
  
    } else if(type === 'Presence') {
  
      data = {
        user: employee,
        type,
        remoteOffice: remoteOrOffice,
        date,
        date2,
        workingFrom,
        workingTo,
        onPauseFrom,
        onPauseTo,
        typeOfAbsence: '',
        placeOfBusinessTrip: ''
      }
  
      if(employee === '' || date === '' || date2 === '' || remoteOrOffice === '' || workingFrom === ''
       || workingTo === '' || onPauseFrom === '' || onPauseTo === '') {
        this.showError = true
      } else {
        this.create(data);
      }
  
    } else {
  
      data = {
        user: employee,
        type,
        remoteOffice: '',
        date,
        date2,
        workingFrom: '',
        workingTo: '',
        onPauseFrom: '',
        onPauseTo: '',
        typeOfAbsence: '',
        placeOfBusinessTrip: place
      }
  
      if(employee === '' || date === '' || date2 === '' || place === '') {
        this.showError = true
      } else {
        this.create(data);
      }
  
    }


    }

   

  
    
  }

  create(data): void {
    this.showError = false

    const {user, type, remoteOffice, date, date2, workingFrom, 
      workingTo, onPauseFrom, onPauseTo, typeOfAbsence, placeOfBusinessTrip} = data;

    const range = this.getDates(date, date2);

    for (let index = 0; index < range.length; index++) {

      
      
      const data2 = {
        type,
        user,
        date: range[index],
        remoteOffice,
        workingFrom,
        workingTo,
        onPauseFrom,
        onPauseTo,
        typeOfAbsence,
        placeOfBusinessTrip
      }

      this.sub2 = this.absencePresenceService.addPresenceAbsence(data2).subscribe(result => {

        this.dates.push(data2.date);

        this.counter++;
        this.counter2++;

        if(this.counter === range.length) {

          
          // show snack
          this._snackBar.openFromComponent(SnackComponent, {
            duration: 4000
          })

          setTimeout(function() {
            location.reload();
          }, 2000)

         



        } else if(this.counter2 === range.length && this.hasError) {

          for (let index = 0; index < this.dates.length; index++) {
            
            this.sub3 = this.absencePresenceService.deleteDataByUserIDAndDate(data2.user, this.dates[index]).subscribe(result => {
              console.log(result);
            })
            
          }
        }

      
      }, error => {
        this.errorMessage = error.error.errors;

        this.hasError = true
        this.counter2++;

        if(this.counter2 === range.length && this.hasError) {

           for (let index = 0; index < this.dates.length; index++) {
            
            this.sub3 = this.absencePresenceService.deleteDataByUserIDAndDate(data2.user, this.dates[index]).subscribe(result => {
              console.log(result);
            })
            
          }
        }

      })
      
    }

  }

  getDates(dateFrom: any, dateTo: any) {
    let dateArray = new Array();
    let currentDate = new Date(dateFrom);

    while (currentDate <= dateTo) {

      dateArray.push(new Date (currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

}
