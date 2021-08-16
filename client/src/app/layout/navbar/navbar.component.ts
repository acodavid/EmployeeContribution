import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../data/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  imageUrl = 'assets/images/WaySeven_icon_standard.svg'

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // console.log(this.userService.checkGlobalAdmin())
  }

  logout(){

    this.userService.logout();
    this.router.navigate(['/login'])

  }

}
