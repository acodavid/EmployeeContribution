import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../data/services/user.service';
import { AbsencePresenceService } from '../../data/services/absence-presence.service'
import { PresenceAbsence } from 'src/app/data/models/PresenceAbsence';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private sub1: any;
  private sub2: any;

  loading: boolean = true;

  data: PresenceAbsence;

  employee: string = 'employee'

  constructor(
    public userService: UserService,
    private router: Router,
    private absencePresenceService: AbsencePresenceService
  ) { }

  ngOnInit(): void {

    this.sub1 = this.userService.getCurrentUser().subscribe(user => {


      if(user.firstLogin) {
        this.router.navigate(['/password/change'])
      } else if(!user.preferenceCreated) {
        this.router.navigate(['/preference/create'])
      } else {

        this.sub2 = this.absencePresenceService.getAbsencePresenceBusinessTrip(user._id, new Date()).subscribe(data => {
          this.data = data[0];

          this.data.date = this.data.date.slice(8, 10) + '.' + this.data.date.slice(5, 7) + '.' + this.data.date.slice(0, 4)
          this.loading = false
        }, error => {
          this.loading = false
        })

      }
      
      
    })
    
  }

  ngOnDestroy() {
    if(this.sub1){
      this.sub1.unsubscribe();
    }

    if(this.sub2) {
      this.sub2.unsubscribe();
    }
    
  } 

}
