import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/data/models/User';
import { UserRegister } from 'src/app/data/models/UserRegister';
import { UserService } from '../../data/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: UserRegister;

  employees: User[];

  noUsers: boolean = true

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.userService.getCurrentUser().subscribe(user => {
      if(user.firstLogin) {
        this.router.navigate(['/password/change'])
      } else if(!user.preferenceCreated) {
        this.router.navigate(['/preference/create'])
      }
      this.user = user;

      if(user.isAdmin) {

        this.userService.getUsers().subscribe(users => {

          this.employees = users;
          this.noUsers = false;
          
        }, errors => {
          this.noUsers = true;
        })

      }
      
    })

    
    
  }

}
