import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { of } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/data/dialogs/delete-dialog/delete-dialog.component';
import { Holiday } from 'src/app/data/models/Holiday';
import { HolidayService } from 'src/app/data/services/holiday.service';
import { UserService } from 'src/app/data/services/user.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit, OnDestroy {

  private sub1: any;
  private sub2: any;
  private sub3: any;
  private sub4: any;
  private sub5: any;

  holidayForm: FormGroup;

  displayedColumns: string[] = ['title', 'date', 'day', 'actions'];
  dataSource: Holiday[];

  errorMessage: string;

  loading: boolean = true;

  editForm: boolean = false;

  idForEdit: string;

  dateInput;

  dataForEdit: Holiday;

  arrayYears: number[] = [2021];

  constructor(
    private holidayService: HolidayService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.composeForm();
    this.createArrayOfYears();
   }

  ngOnInit(): void {

    if(!this.userService.checkAdmin()) {
      this.router.navigate(['/not-found'])
    } else {

      const currentYear = new Date();

      this.sub1 = this.holidayService.getHolidays(currentYear.getFullYear()).subscribe(holidays => {
        this.dataSource = holidays

        for (let index = 0; index < this.dataSource.length; index++) {
          
          let newDate = new Date(this.dataSource[index].date);

          if(newDate.getDay() === 1) {
            this.dataSource[index].day = 'Monday'
          } else if (newDate.getDay() === 2){
            this.dataSource[index].day = 'Tuesday'
          } else if (newDate.getDay() === 3){
            this.dataSource[index].day = 'Wednesday'
          } else if (newDate.getDay() === 4){
            this.dataSource[index].day = 'Thursday'
          } else if (newDate.getDay() === 5){
            this.dataSource[index].day = 'Friday'
          } else if (newDate.getDay() === 6){
            this.dataSource[index].day = 'Saturday'
          } else{
            this.dataSource[index].day = 'Sunday'
          }
          
          
        }

        this.loading = false
      }, error => {
        this.errorMessage = error.error.notFound;
        console.log(this.errorMessage)
      })

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

    if(this.sub4){
      this.sub4.unsubscribe();
    }

    if(this.sub5){
      this.sub5.unsubscribe();
    }
    
  }

  date(e, name) {

    let convertDate;

    convertDate = moment(e.target.value._d).add(3, 'hours')
    
    this.holidayForm.get(name).setValue(convertDate._d, {
      onlyself: true
    })

    
  }

  composeForm(): void { 
    this.holidayForm = new FormGroup({
      title: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      year: new FormControl(new Date().getFullYear())
    })
  }

  addHoliday(): void {

    if (!this.editForm) {
      this.sub4 = this.holidayService.addHoliday(this.holidayForm.value).subscribe(result => {
        location.reload()
      })
    } else {

      const { title, date } = this.holidayForm.value

      this.dataForEdit = {
        _id: this.idForEdit,
        title,
        date
      }

      this.sub5 = this.holidayService.updateHoliday(this.dataForEdit).subscribe(result => {
        location.reload()
      })

    }
    
  }

  changeToEdit(holiday): void {
    this.editForm = true

    this.holidayForm.setValue({
      title: holiday.title,  
      date: holiday.date,
      year: new Date().getFullYear()
    })

    this.dateInput = holiday.date

    this.idForEdit = holiday._id;
  }

  deleteHoliday(id): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    this.sub2 = dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.sub3 = this.holidayService.deleteHoliday(id).subscribe(result => {
          this.dataSource = this.dataSource.filter(({ _id }) => _id !== id);
        })
      }
    })
  }

  createArrayOfYears() {
    
    const currentDate = new Date();

    for (let index = 1; index < 50; index++) {
      
       this.arrayYears.push(currentDate.getFullYear() + index)
      
     }

  }

  onChange(e): void {
    
    this.holidayService.getHolidays(e.value).subscribe(holidays => {
      this.dataSource = holidays
      this.loading = false
    }, error => {
      this.errorMessage = error.error.notFound;
      console.log(this.errorMessage)
    })
    
  }

}
