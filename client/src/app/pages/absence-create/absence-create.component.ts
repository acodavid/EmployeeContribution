import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AbsencePresenceService } from 'src/app/data/services/absence-presence.service';
import { UserService } from 'src/app/data/services/user.service';

@Component({
  selector: 'app-absence-create',
  templateUrl: './absence-create.component.html',
  styleUrls: ['./absence-create.component.scss']
})
export class AbsenceCreateComponent implements OnInit, OnDestroy {

  absenceForm: FormGroup;

  errorMessage: string;

  userId: string;

  counter: number = 0;
  counter2: number = 0;
  hasError: boolean = false;
  dates = []; 

  errors: any = {
    type: '',
    dateFrom: '',
    dateTo: ''
  };

  invalidDateRange: string = '';

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
    this.absenceForm = new FormGroup({
      type: new FormControl('', Validators.required),
      dateFrom: new FormControl('', Validators.required),
      dateTo: new FormControl('', Validators.required)
    })
  }

  addAbsence(): void {
    const { type, dateFrom, dateTo } = this.absenceForm.value;

    if(dateFrom.getTime() > dateTo.getTime()) {
     
      this.invalidDateRange = 'Please insert valid dates range!'

    } else {
      const range = this.getDates(dateFrom, dateTo);

    for (let index = 0; index < range.length; index++) {

      const data = {
        type: 'Absence',
        user: this.userId,
        date: range[index],
        typeOfAbsence: type
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
    

    
  }

  date(e, name) {

    let convertDate;

    convertDate = moment(e.target.value._d).add(3, 'hours')
    
    this.absenceForm.get(name).setValue(convertDate._d, {
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
