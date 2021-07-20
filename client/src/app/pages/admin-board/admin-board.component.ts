import { Component, OnInit } from '@angular/core';
import { UserRegister } from 'src/app/data/models/UserRegister';
import { UserService } from 'src/app/data/services/user.service';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/data/dialogs/delete-dialog/delete-dialog.component';
import * as moment from 'moment';
import { AbsencePresenceService } from 'src/app/data/services/absence-presence.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss']
})
export class AdminBoardComponent implements OnInit {

  displayedColumns: string[] = ['checkbox', 'status', 'name', 'email', 'work-time', 'actions'];
  dataSource: UserRegister[];

  loading: boolean = true;

  private sub1: any;
  private sub2: any;
  private sub3: any;
  private sub4: any;
  private sub5: any;

  counter: number = 0;

  selected: string = 'all'

  // todays date
  today: Date = new Date();

  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private absencePresenceService: AbsencePresenceService
  ) { }

  ngOnInit(): void {
    if(this.userService.checkAdmin()) {
      this.sub1 = this.userService.getUsers().subscribe(users => {
        this.dataSource = users;
        

        for (let index = 0; index < this.dataSource.length; index++) {
          const user = this.dataSource[index];
    
          this.sub4 = this.absencePresenceService.getAbsencePresenceBusinessTrip(user._id, this.today).subscribe(data => {
            this.dataSource[index].statusForTable = data[0]
          }, error => {
            this.dataSource[index].statusForTable = {
              type: 'None'
            }
          })
          
        }

        this.loading = false;
      })
    } else {
      this.router.navigate(['/not-found'])
    }

    

   
  }

  ngOnDestroy() {
    if(this.sub1) {
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

    if(this.sub5) {
      this.sub5.unsubscribe();
    }
  } 

  deleteUser(id) {

    const dialogRef = this.dialog.open(DeleteDialogComponent);

    this.sub2 = dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.sub3 = this.userService.deleteUser(id).subscribe(result => {
          this.dataSource = this.dataSource.filter(({ _id }) => _id !== id);
        })
      }
    })
  

  }

  filterByName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

      this.sub1 = this.userService.getUsers().subscribe(users => {
        this.dataSource = users;
        this.dataSource = this.dataSource.filter(user => user.name.toLowerCase().includes(filterValue.toLowerCase()));

        for (let index = 0; index < this.dataSource.length; index++) {
          const user = this.dataSource[index];
    
          this.sub5 = this.absencePresenceService.getAbsencePresenceBusinessTrip(user._id, this.today).subscribe(data => {
            this.dataSource[index].statusForTable = data[0]
          }, error => {
            this.dataSource[index].statusForTable = {
              type: 'None'
            }
          })
          
        }
      })
    

    
  }

  onTypeChange(event) {

    

      this.sub1 = this.userService.getUsers().subscribe(users => {
        this.dataSource = users;
        

        for (let index = 0; index < this.dataSource.length; index++) {
          const user = this.dataSource[index];
    
          this.sub4 = this.absencePresenceService.getAbsencePresenceBusinessTrip(user._id, this.today).subscribe(data => {
            this.dataSource[index].statusForTable = data[0]
            this.counter++;

            if(this.counter === this.dataSource.length) {

              this.counter = 0

              if (event.value === 'presence') {
                this.dataSource = this.dataSource.filter(item => item.statusForTable.type ==='Presence')
              } else if(event.value === 'absence') { 
                this.dataSource = this.dataSource.filter(item => item.statusForTable.type ==='Absence')
              } else if(event.value === 'business trip') {
                this.dataSource = this.dataSource.filter(item => item.statusForTable.type ==='Business Trip')
              }
            }
          }, error => {
            this.dataSource[index].statusForTable = {
              type: 'None'
            }
            this.counter++

            if(this.counter === this.dataSource.length) {

              this.counter = 0
              if (event.value === 'presence') {
                this.dataSource = this.dataSource.filter(item => item.statusForTable.type ==='Presence')
              } else if(event.value === 'absence') { 
                this.dataSource = this.dataSource.filter(item => item.statusForTable.type ==='Absence')
              } else if(event.value === 'business trip') {
                this.dataSource = this.dataSource.filter(item => item.statusForTable.type ==='Business Trip')
              }
            }
          })
          
        }

        


        this.loading = false;
      })
      


  }

  date(e) {

    this.today = e.target.value._d

    this.sub1 = this.userService.getUsers().subscribe(users => {
      this.dataSource = users;
      

      for (let index = 0; index < this.dataSource.length; index++) {
        const user = this.dataSource[index];
  
        this.sub4 = this.absencePresenceService.getAbsencePresenceBusinessTrip(user._id, this.today).subscribe(data => {
          this.dataSource[index].statusForTable = data[0]
        }, error => {
          this.dataSource[index].statusForTable = {
            type: 'None'
          }
        })
        
      }

      this.loading = false;
    })

    
  }

}
