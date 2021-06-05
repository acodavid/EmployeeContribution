import { Component, OnInit } from '@angular/core';
import { UserService } from '../../data/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/data/models/User';
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
  passwordUpdateForm: FormGroup;
  user: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) { 
    this.composeForm();
  }

  ngOnInit(): void {
    
  }

  composeForm(): void {

    this.passwordUpdateForm = new FormGroup({
      currentPassword: new FormControl(this.currentPassword, Validators.required),
      newPassword: new FormControl(this.newPassword, Validators.required),
      newPasswordConfirmation: new FormControl(this.newPasswordConfirmation, Validators.required)
    })
    
  }

  changePassword() {

    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;

      const {currentPassword, newPassword, newPasswordConfirmation} = this.passwordUpdateForm.value

        // DATA
        this.data = {
          id: this.user.id,
          currentPassword,
          newPassword,
          newPasswordConfirmation
        }

        this.userService.changePassword(this.data).subscribe(
          result => {
            this.router.navigate(['/']);
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
    })

    
  }
}
