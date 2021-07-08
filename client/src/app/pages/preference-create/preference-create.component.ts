import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Preference } from 'src/app/data/models/Preference';
import { UserService } from 'src/app/data/services/user.service';
import {PreferenceService} from '../../data/services/preference.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preference-create',
  templateUrl: './preference-create.component.html',
  styleUrls: ['./preference-create.component.scss']
})
export class PreferenceCreateComponent implements OnInit {

  errors: any = {
    workingFrom: '',
    workingTo: '',
    onPauseFrom: '',
    onPauseTo: ''
  };

  preferenceForm: FormGroup;

  private sub1: any;
  private sub2: any;
  private sub3: any;
  private sub4: any;

  constructor(
    private preferenceService: PreferenceService,
    private userService: UserService,
    private router: Router
  ) { 
    this.composeForm();
  }

  ngOnInit(): void {
    this.sub4 = this.userService.getCurrentUser().subscribe(user => {
      if(user.preferenceCreated) {
        this.router.navigate(['/']);
      }
    })
  }

  ngOnDestroy() {
    if(this.sub1){
      this.sub1.unsubscribe();
    }

    if(this.sub2) {
      this.sub2.unsubscribe();
    }

    if(this.sub3) {
      this.sub3.unsubscribe();
    }

    if(this.sub4) {
      this.sub4.unsubscribe();
    }
    
  } 

  composeForm(): void {
    this.preferenceForm = new FormGroup({
      remoteOrOffice: new FormControl('', Validators.required),
      workingFrom: new FormControl('', Validators.required),
      workingTo: new FormControl('', Validators.required),
      onPauseFrom: new FormControl('', Validators.required),
      onPauseTo: new FormControl('', Validators.required)
    })
  }

  addPreference(): void {

    const { remoteOrOffice, workingFrom, workingTo, onPauseFrom, onPauseTo } = this.preferenceForm.value 

    this.sub1 = this.userService.getCurrentUser().subscribe(user => {

      let preference: Preference = {
        user: user._id,
        remoteOrOffice,
        workingFrom,
        workingTo,
        onPauseFrom,
        onPauseTo
      };

      this.sub2 = this.preferenceService.addPreference(preference).subscribe(result => {
        this.sub3 = this.preferenceService.setPreferenceCreated({id: user._id}).subscribe(user => {
          this.router.navigate(['/']);
        }, error => {
          if(error.error.workingFrom) {
            this.preferenceForm.get('workingFrom').setErrors({'valid': false});
          }

          if(error.error.workingTo) {
            this.preferenceForm.get('workingTo').setErrors({'valid': false});
          }

          if(error.error.onPauseFrom) {
            this.preferenceForm.get('onPauseFrom').setErrors({'valid': false});
          }

          if(error.error.onPauseTo) {
            this.preferenceForm.get('onPauseTo').setErrors({'valid': false});
          }

          this.errors = error.error;
        });
        
      })

    })

  }

}
