import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRegister } from 'src/app/data/models/UserRegister';
import { UserService } from 'src/app/data/services/user.service';

@Component({
  selector: 'app-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrls: ['./user-password-change.component.scss']
})
export class UserPasswordChangeComponent implements OnInit {

  hide2: boolean = true;
  hide3: boolean = true;

  user: UserRegister;
  errors: any = {
    newPassword: '',
    newPasswordConfirmation: ''
  }

  changePassForm: FormGroup;

  idFromParam: string;

  loading = true;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.composeForm();
  }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe(params => {
      this.idFromParam = params['id'];

      this.userService.getUserById(this.idFromParam).subscribe(user => {
        this.user = user;

        this.loading = false
      })
    })

    
  }

  changePassword() {

    const {newPassword, newPasswordConfirmation} = this.changePassForm.value;

    const data = {
      id: this.idFromParam,
      newPassword,
      newPasswordConfirmation
    }

    this.userService.changeUserPassword(data).subscribe(result => {
      this.router.navigate(['/employees'])
      console.log(result);
    }, error => {
      if(error.error.newPassword) {
        this.changePassForm.get('newPassword').setErrors({'valid': false});
      }

      if(error.error.newPasswordConfirmation) {
        this.changePassForm.get('newPasswordConfirmation').setErrors({'valid': false});
      }

      this.errors = error.error
    })

  }

  composeForm(): void {

    this.changePassForm = new FormGroup({
      newPassword: new FormControl('', Validators.required),
      newPasswordConfirmation: new FormControl('', Validators.required)
    })
    
  }

}
