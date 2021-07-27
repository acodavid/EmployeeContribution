import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DeleteDialogComponent } from 'src/app/data/dialogs/delete-dialog/delete-dialog.component';
import { Holiday } from 'src/app/data/models/Holiday';
import { HolidayService } from 'src/app/data/services/holiday.service';
import { UserService } from 'src/app/data/services/user.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {

  private sub1: any;
  private sub2: any;
  private sub3: any;
  private sub4: any;
  private sub5: any;

  holidayForm: FormGroup;

  displayedColumns: string[] = ['title', 'date', 'actions'];
  dataSource: Holiday[];

  errorMessage: string;

  loading: boolean = true;

  editForm: boolean = false;

  idForEdit: string;

  dateInput;

  dataForEdit: Holiday;

  constructor(
    private holidayService: HolidayService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.composeForm();
   }

  ngOnInit(): void {

    if(!this.userService.checkAdmin()) {
      this.router.navigate(['/']);
    } else {

      this.sub1 = this.holidayService.getHolidays().subscribe(holidays => {
        this.dataSource = holidays
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
      date: new FormControl('', Validators.required)
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
      date: holiday.date
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

}
