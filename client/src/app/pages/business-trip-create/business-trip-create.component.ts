import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AbsencePresenceService } from 'src/app/data/services/absence-presence.service';
import { UserService } from 'src/app/data/services/user.service';

@Component({
  selector: 'app-business-trip-create',
  templateUrl: './business-trip-create.component.html',
  styleUrls: ['./business-trip-create.component.scss']
})
export class BusinessTripCreateComponent implements OnInit, OnDestroy {

  businessTripForm: FormGroup;

  errors: any = {
    place: '',
    dateFrom: '',
    dateTo: ''
  };

  counter: number = 0;
  counter2: number = 0;
  hasError: boolean = false;
  dates = []; 

  errorMessage: string;

  userId: string;

  private sub1: any;
  private sub2: any;
  private sub3: any;
  private sub4: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private absencePresenceService: AbsencePresenceService
  ) { 
    this.composeForm(); 
  }

  ngOnInit(): void {
    this.sub1 = this.userService.getCurrentUser().subscribe(user => {
      this.userId = user._id;
    })
  }

  ngOnDestroy() {
    if(this.sub1){
      this.sub1.unsubscribe();
    }

    if(this.sub2) {
      this.sub2.unsubscribe();
    }

    if(this.sub3){
      this.sub3.unsubscribe();
    }

    if(this.sub4) {
      this.sub4.unsubscribe();
    }
    
  } 

  composeForm(): void {
    this.businessTripForm = new FormGroup({
      place: new FormControl('', Validators.required),
      dateFrom: new FormControl('', Validators.required),
      dateTo: new FormControl('', Validators.required)
    })
  }

  addBusinessTrip(): void {
    const { place, dateFrom, dateTo } = this.businessTripForm.value;

    const range = this.getDates(dateFrom, dateTo);

    for (let index = 0; index < range.length; index++) {

      const data = {
        type: 'Business Trip',
        user: this.userId,
        date: range[index],
        placeOfBusinessTrip: place
      }
      
      this.sub2 = this.absencePresenceService.addPresenceAbsence(data).subscribe(result => {
        
        this.dates.push(data.date);

        this.counter++;
        this.counter2++;

        if(this.counter === range.length) {
          this.router.navigate(['/']);
        } else if(this.counter2 === range.length && this.hasError) {

          for (let index = 0; index < this.dates.length; index++) {
            
            this.sub3 = this.absencePresenceService.deleteDataByUserIDAndDate(this.userId, this.dates[index]).subscribe(result => {
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
            
            this.sub4 = this.absencePresenceService.deleteDataByUserIDAndDate(this.userId, this.dates[index]).subscribe(result => {
              console.log(result);
            })
            
          }
        }
      })
      
    }

    
  }

  date(e, name) {

    let convertDate;

    convertDate = moment(e.target.value._d).add(3, 'hours')
    
    this.businessTripForm.get(name).setValue(convertDate._d, {
      onlyself: true
    })

    
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



