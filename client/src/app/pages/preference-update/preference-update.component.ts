import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreferenceService } from 'src/app/data/services/preference.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Preference } from 'src/app/data/models/Preference';

@Component({
  selector: 'app-preference-update',
  templateUrl: './preference-update.component.html',
  styleUrls: ['./preference-update.component.scss']
})
export class PreferenceUpdateComponent implements OnInit {

  preferenceUpdateForm: FormGroup;

  param: string;

  preference: Preference;

  private sub1: any;
  private sub2: any;
  private sub3: any;

  errors: any = {
    workingFrom: '',
    workingTo: '',
    onPauseFrom: '',
    onPauseTo: ''
  };

  constructor(
    private preferenceService: PreferenceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.composeForm();
  }

  composeForm(): void {
    this.preferenceUpdateForm = new FormGroup({
      remoteOrOffice: new FormControl('', Validators.required),
      workingFrom: new FormControl('', Validators.required),
      workingTo: new FormControl('', Validators.required),
      onPauseFrom: new FormControl('', Validators.required),
      onPauseTo: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {

    this.sub1 = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.param = id;

      this.sub2 = this.preferenceService.getPreferenceById(this.param).subscribe(preference => {

        const { remoteOrOffice, workingFrom, workingTo, onPauseFrom, onPauseTo } = preference

        this.preference = preference;

        this.preferenceUpdateForm.setValue({
          remoteOrOffice,
          workingFrom,
          workingTo,
          onPauseFrom,
          onPauseTo
        })
      })
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
    
  } 

  updatePreference(): void {
    const { remoteOrOffice,
            workingFrom,
            workingTo, 
            onPauseFrom, 
            onPauseTo } = this.preferenceUpdateForm.value;


    const pref: Preference = {
      _id: this.preference._id,
      user: this.preference.user,
      remoteOrOffice,
      workingFrom,
      workingTo,
      onPauseFrom,
      onPauseTo
    }

    this.sub3 = this.preferenceService.updatePreference(pref).subscribe(result => {
      this.router.navigate(['/preference/details']);
    }, error => {
      if(error.error.workingFrom) {
        this.preferenceUpdateForm.get('workingFrom').setErrors({'valid': false});
      }

      if(error.error.workingTo) {
        this.preferenceUpdateForm.get('workingTo').setErrors({'valid': false});
      }

      if(error.error.onPauseFrom) {
        this.preferenceUpdateForm.get('onPauseFrom').setErrors({'valid': false});
      }

      if(error.error.onPauseTo) {
        this.preferenceUpdateForm.get('onPauseTo').setErrors({'valid': false});
      }

      this.errors = error.error;
    })
    
  }

}
