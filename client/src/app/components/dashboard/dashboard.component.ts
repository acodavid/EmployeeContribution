import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

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
    this.userService.getCurrentUser().subscribe(response => {
      this.user = response;

      if(this.user.firstLogin) {
        // redirects to the change of the password
        this.router.navigate(['/password/change'])
      }
    })
  }

}
