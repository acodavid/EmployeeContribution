import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../data/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  logout(){

    this.userService.logout();
    this.router.navigate(['/login'])

  }

}
