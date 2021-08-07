import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DeleteDialogComponent } from 'src/app/data/dialogs/delete-dialog/delete-dialog.component';
import { PresenceAbsence } from 'src/app/data/models/PresenceAbsence';
import { UserRegister } from 'src/app/data/models/UserRegister';
import { AbsencePresenceService } from 'src/app/data/services/absence-presence.service';
import { UserService } from 'src/app/data/services/user.service';

@Component({
  selector: 'app-search-contributions',
  templateUrl: './search-contributions.component.html',
  styleUrls: ['./search-contributions.component.scss']
})
export class SearchContributionsComponent implements OnInit, OnDestroy {

  private sub1: any;
  private sub2: any;
  private sub3: any;
  private sub4: any;

  searchForm: FormGroup;

  users: UserRegister[];

  displayedColumns: string[] = ['date', 'type', 'actions'];
  dataSource: PresenceAbsence[];
  

  loading: boolean = true
  submited: boolean = false
  loadingTable: boolean = true

  errorMessage: string;

  name: string;

  constructor(
    private userService: UserService,
    private absencePresenceService: AbsencePresenceService,
    private dialog: MatDialog,
    private router: Router
  ) { 
    this.composeForm();
  }

  ngOnInit(): void {

    if(this.userService.checkAdmin()) {
      this.sub1 = this.userService.getUsers().subscribe(users => {
        this.users = users;
        this.loading = false
      })
    } else {
      this.userService.getCurrentUser().subscribe(user => {

        this.name = user.name;

        this.searchForm.setValue({
          employee: user._id,
          date1: '',
          date2: ''
        })

        this.loading = false
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
    
  }


  composeForm(): void { 
    this.searchForm = new FormGroup({
      employee: new FormControl('', Validators.required),
      date1: new FormControl('', Validators.required),
      date2: new FormControl('', Validators.required)
    })
  }

  date(e, name) {

    let convertDate;

    convertDate = moment(e.target.value._d).add(3, 'hours')
    
    this.searchForm.get(name).setValue(convertDate._d, {
      onlyself: true
    })

    
  }

  searchData(): void {

    this.loadingTable = true
    this.dataSource = [];


    const { employee, date1, date2 } = this.searchForm.value

    this.submited = true;

    this.sub2 = this.absencePresenceService.getDataFromRange(employee, date1, date2).subscribe(data => {
      this.dataSource = data;
      this.loadingTable = false
      console.log(this.dataSource)
    }, error => {
      this.errorMessage = error.error.error;
    })
  }

  deleteContribution(id): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    this.sub3 = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sub4 = this.absencePresenceService.deleteDataById(id).subscribe(result => {
          this.dataSource = this.dataSource.filter(({ _id }) => _id !== id);
        })
      }
    })

  }


}
