import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PreferenceService } from '../../data/services/preference.service';
import { AbsencePresenceService } from '../../data/services/absence-presence.service'
import * as moment from 'moment';

@Component({
  selector: 'app-presence-create',
  templateUrl: './presence-create.component.html',
  styleUrls: ['./presence-create.component.scss']
})
export class PresenceCreateComponent implements OnInit, OnDestroy {

  presenceForm: FormGroup;

  errors: any = {
    workingFrom: '',
    workingTo: '',
    onPauseFrom: '',
    onPauseTo: '',
    date: ''
  };

  errorMessage: string;

  private sub1: any;
  private sub2: any;

  dateInput;

  userId: string;

  constructor(
    private router: Router,
    private preferenceService: PreferenceService,
    private absencePresenceService: AbsencePresenceService
  ) { 
    this.composeForm(); 
  }

  ngOnInit(): void {

    // populate form with preferences

    this.dateInput = new Date()

    this.sub1 = this.preferenceService.getPreferenceCurrentUser().subscribe(pref => {

      this.userId = pref.user;

      this.presenceForm.setValue({
        remoteOrOffice: pref.remoteOrOffice,
        workingFrom: pref.workingFrom,
        workingTo: pref.workingTo,
        onPauseFrom: pref.onPauseFrom,
        onPauseTo: pref.onPauseTo,
        date: new Date()
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
    
  } 

  composeForm(): void {
    this.presenceForm = new FormGroup({
      remoteOrOffice: new FormControl('', Validators.required),
      workingFrom: new FormControl('', Validators.required),
      workingTo: new FormControl('', Validators.required),
      onPauseFrom: new FormControl('', Validators.required),
      onPauseTo: new FormControl('', Validators.required),
      date: new FormControl('')
    })
  }

  addPresence(): void {

    const { remoteOrOffice, workingFrom, workingTo, onPauseFrom, onPauseTo } = this.presenceForm.value

    const data = {
      type: 'Presence',
      user: this.userId,
      date: this.dateInput,
      remoteOffice: remoteOrOffice,
      workingFrom,
      workingTo,
      onPauseFrom,
      onPauseTo 
    }
    
    this.sub2 = this.absencePresenceService.addPresenceAbsence(data).subscribe(result => {
      this.router.navigate(['/']);
    }, error => {
      this.errorMessage = error.error.errors
    })
    
  }

}
