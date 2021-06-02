import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../data/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user = {
    id: '',
    email: '',
    isAdmin: '',
    firstLogin: false
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.user = this.userService.getUserData();

    if(this.user.firstLogin) {
      this.router.navigate(['/password/change'])
    }
    
  }

}
