import { Component, OnInit } from '@angular/core';
import { UserService } from '../../data/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  currentPassword: string = '';
  newPassword: string = '';
  newPasswordConfirmation: string = '';
  data: any;
  errors: any = {
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmation: ''
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  changePassword({value}) {

    const user = JSON.parse(localStorage.getItem('user'))

    // DATA
    this.data = {
      id: user.id,
      currentPassword: value.currentPassword,
      newPassword: value.newPassword,
      newPasswordConfirmation: value.newPasswordConfirmation 
    }

    this.userService.changePassword(this.data).subscribe(
      result => {
        this.userService.setUserData();
      }, error => {
        this.errors = error.error
      }, () => {
        this.currentPassword = '';
        this.newPassword = '';
        this.newPasswordConfirmation = '';
        this.errors = {
          currentPassword: '',
          newPassword: '',
          newPasswordConfirmation: ''
        }
      }
    )
  }
}
