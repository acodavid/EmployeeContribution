import { Component, OnInit } from '@angular/core';
import { UserService } from '../../data/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/data/models/UserRegister';

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

  data: any;
  errors: any = {
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmation: ''
  }
  passwordUpdateForm: FormGroup;
  user: UserRegister;

  private sub1: any;
  private sub2: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) { 
    this.composeForm();
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    if(this.sub1){
      this.sub1.unsubscribe();
    }

    if(this.sub2) {
      this.sub2.unsubscribe();
    }
    
  } 

  composeForm(): void {

    this.passwordUpdateForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      newPasswordConfirmation: new FormControl('', Validators.required)
    })
    
  }

  changePassword() {

    this.sub1 = this.userService.getCurrentUser().subscribe(user => {
      this.user = user;

      const {currentPassword, newPassword, newPasswordConfirmation} = this.passwordUpdateForm.value

        // DATA
        this.data = {
          id: this.user._id,
          currentPassword,
          newPassword,
          newPasswordConfirmation
        }

        this.sub2 = this.userService.changePassword(this.data).subscribe(
          result => {
            

            if(this.user.preferenceCreated) {
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/preference/create']);
            }
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
