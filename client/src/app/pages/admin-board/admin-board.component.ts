import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { UserRegister } from 'src/app/data/models/UserRegister';
import { UserService } from 'src/app/data/services/user.service';
import { Router } from '@angular/router';

import { AbsencePresenceService } from 'src/app/data/services/absence-presence.service';
import { DateAdapter } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss']
})
export class AdminBoardComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;


  displayedColumns: string[] = ['checkbox', 'status', 'name', 'email', 'start', 'end', 'break', 'office-remote', 'actions'];

  public dataSource = new MatTableDataSource<UserRegister>();


  loading: boolean = true;

  private sub1: any;
  private sub2: any;
  private sub3: any;
  private sub4: any;
  private sub5: any;

  counter: number = 0;

  selected: string = 'all'

  userType: string = ''
  userID: string = ''

  // todays date
  today: Date = new Date();

  constructor(
    private userService: UserService,
    private router: Router,
    private absencePresenceService: AbsencePresenceService, private dateAdapter: DateAdapter<Date>
  ) { }

  

  ngOnInit(): void {

    this.dateAdapter.getFirstDayOfWeek = () => {return 1}

    if(this.userService.checkAdmin()) {
      this.sub1 = this.userService.getUsers().subscribe(users => {
        this.dataSource.data = users;

        this.userService.getCurrentUser().subscribe(user => {
          this.userType = user.type;
          this.userID = user._id;
        })

        for (let index = 0; index < this.dataSource.data.length; index++) {
          const user = this.dataSource.data[index];
    
          this.sub4 = this.absencePresenceService.getAbsencePresenceBusinessTrip(user._id, this.today).subscribe(data => {
            this.dataSource.data[index].statusForTable = data[0]
          }, error => {
            this.dataSource.data[index].statusForTable = {
              type: 'None'
            }
          })
          
        }

        this.loading = false;
        
      })

      


    } else {
      this.router.navigate(['/not-found'])
    }

    // this.dataSource.data = this.dataSource.data.sort((a, b) => a.statusForTable.type - b.statusForTable.type);
    
  }

  ngAfterViewInit(): void {
    if(this.sort){
      this.dataSource.sort = this.sort;
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

  filterByName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

      this.sub1 = this.userService.getUsers().subscribe(users => {
        this.dataSource.data = users;
        this.dataSource.data = this.dataSource.data.filter(user => user.name.toLowerCase().includes(filterValue.toLowerCase()));

        for (let index = 0; index < this.dataSource.data.length; index++) {
          const user = this.dataSource.data[index];
    
          this.sub5 = this.absencePresenceService.getAbsencePresenceBusinessTrip(user._id, this.today).subscribe(data => {
            this.dataSource.data[index].statusForTable = data[0]
          }, error => {
            this.dataSource.data[index].statusForTable = {
              type: 'None'
            }
          })
          
        }
      })
    

    
  }

  onTypeChange(event) {

    

      this.sub1 = this.userService.getUsers().subscribe(users => {
        this.dataSource.data = users;
        

        for (let index = 0; index < this.dataSource.data.length; index++) {
          const user = this.dataSource.data[index];
    
          this.sub4 = this.absencePresenceService.getAbsencePresenceBusinessTrip(user._id, this.today).subscribe(data => {
            this.dataSource.data[index].statusForTable = data[0]
            this.counter++;

            if(this.counter === this.dataSource.data.length) {

              this.counter = 0

              if (event.value === 'presence') {
                this.dataSource.data = this.dataSource.data.filter(item => item.statusForTable.type ==='Presence')
              } else if(event.value === 'absence') { 
                this.dataSource.data = this.dataSource.data.filter(item => item.statusForTable.type ==='Absence')
              } else if(event.value === 'business trip') {
                this.dataSource.data = this.dataSource.data.filter(item => item.statusForTable.type ==='Business Trip')
              }
            }
          }, error => {
            this.dataSource.data[index].statusForTable = {
              type: 'None'
            }
            this.counter++

            if(this.counter === this.dataSource.data.length) {

              this.counter = 0
              if (event.value === 'presence') {
                this.dataSource.data = this.dataSource.data.filter(item => item.statusForTable.type ==='Presence')
              } else if(event.value === 'absence') { 
                this.dataSource.data = this.dataSource.data.filter(item => item.statusForTable.type ==='Absence')
              } else if(event.value === 'business trip') {
                this.dataSource.data = this.dataSource.data.filter(item => item.statusForTable.type ==='Business Trip')
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
      this.dataSource.data = users;
      

      for (let index = 0; index < this.dataSource.data.length; index++) {
        const user = this.dataSource.data[index];
  
        this.sub4 = this.absencePresenceService.getAbsencePresenceBusinessTrip(user._id, this.today).subscribe(data => {
          this.dataSource.data[index].statusForTable = data[0]
        }, error => {
          this.dataSource.data[index].statusForTable = {
            type: 'None'
          }
        })
        
      }

      this.loading = false;
    })

    
  }

}
