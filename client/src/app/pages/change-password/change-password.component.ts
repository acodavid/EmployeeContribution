import { Component, OnInit } from '@angular/core';
import { UserService } from '../../data/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/data/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  // password field changers
  hide1: boolean = true;
  hide2: boolean = true;
  hide3: boolean = true;

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

            if(error.error.currentPassword) {
              this.passwordUpdateForm.get('currentPassword').setErrors({'valid': false});
            }

            if(error.error.newPassword) {
              this.passwordUpdateForm.get('newPassword').setErrors({'valid': false});
            }

            if(error.error.newPasswordConfirmation) {
              this.passwordUpdateForm.get('newPasswordConfirmation').setErrors({'valid': false});
            }

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
