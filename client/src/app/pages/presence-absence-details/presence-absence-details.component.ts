import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/data/services/user.service';
import { AbsencePresenceService } from 'src/app/data/services/absence-presence.service';
import * as moment from 'moment';
import { PresenceAbsence } from 'src/app/data/models/PresenceAbsence';

@Component({
  selector: 'app-presence-absence-details',
  templateUrl: './presence-absence-details.component.html',
  styleUrls: ['./presence-absence-details.component.scss']
})
export class PresenceAbsenceDetailsComponent implements OnInit {

  myForm: FormGroup;

  private sub1: any;
  private sub2: any;

  userID: string;
  
  date1: Date = new Date();

  data: PresenceAbsence;

  errorMessage: string;

  constructor(
    private userService: UserService,
    private absencePresenceService: AbsencePresenceService
  ) { 
    this.composeForm();
   }

  ngOnInit(): void {
    this.myForm.setValue({
      date: this.date1
    })

    this.sub1 = this.userService.getCurrentUser().subscribe(user => {
      this.userID = user._id;
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
    this.myForm = new FormGroup({
      date: new FormControl('', Validators.required)
    })
  }

  date(e, name) {

    let convertDate;

    convertDate = moment(e.target.value._d).add(3, 'hours')
    
    this.myForm.get(name).setValue(convertDate._d, {
      onlyself: true
    })

    
  }

  searchData(): void {

    const { date } = this.myForm.value;

    this.sub2 = this.absencePresenceService.getAbsencePresenceBusinessTrip(this.userID, date).subscribe(data => {
      this.data = data[0];
      this.data.date = this.data.date.slice(8, 10) + '.' + this.data.date.slice(5, 7) + '.' + this.data.date.slice(0, 4)
      this.errorMessage = ''
    }, error => {
      this.errorMessage = error.error.error;
    })
  }

}
