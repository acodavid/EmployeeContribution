import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PresenceAbsence } from 'src/app/data/models/PresenceAbsence';
import { AbsencePresenceService } from 'src/app/data/services/absence-presence.service';

@Component({
  selector: 'app-absence-update',
  templateUrl: './absence-update.component.html',
  styleUrls: ['./absence-update.component.scss']
})
export class AbsenceUpdateComponent implements OnInit, OnDestroy {


  errors = {
    date: '',
    workingFrom: '',
    workingTo: '',
    onPauseFrom: '',
    onPauseTo: '',
    place: '',
    typeOfAbsence: ''
  }

  error: boolean = false

  myForm2: FormGroup;
  dateInput;
  paramID: string;
  paramType: string;

  typeOfForm: string

  private sub1: any;
  private sub2: any;
  private sub3: any;
  

  constructor(
    private absencePresenceService: AbsencePresenceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.composeForm();
  }

  ngOnInit(): void {
    this.sub1 = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.paramID = id;

      this.paramType = params['type'];

      this.sub2 = this.absencePresenceService.getById(id).subscribe(data => {
        
        this.dateInput = data.date
        this.typeOfForm = data.type

        console.log(data)

        if(data.type === 'Absence'){

          this.myForm2.setValue({
            type: data.type,
            remoteOrOffice: '',
            date: data.date,
            workingFrom: '',
            workingTo: '',
            onPauseFrom: '',
            onPauseTo: '',
            typeOfAbsence: data.typeOfAbsence,
            place: ''
          })

        } else if(data.type === 'Presence') {

          this.myForm2.setValue({
            type: data.type,
            remoteOrOffice: data.remoteOffice,
            date: data.date,
            workingFrom: data.workingFrom,
            workingTo: data.workingTo,
            onPauseFrom: data.onPauseFrom,
            onPauseTo: data.onPauseTo,
            typeOfAbsence: '',
            place: ''
          })

        } else {
          this.myForm2.setValue({
            type: data.type,
            remoteOrOffice: '',
            date: data.date,
            workingFrom: '',
            workingTo: '',
            onPauseFrom: '',
            onPauseTo: '',
            typeOfAbsence: '',
            place: data.placeOfBusinessTrip
          })
        }


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

  composeForm(): void {
    this.myForm2 = new FormGroup({
      type: new FormControl('', Validators.required),
      remoteOrOffice: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      workingFrom: new FormControl('', Validators.required),
      workingTo: new FormControl('', Validators.required),
      onPauseFrom: new FormControl('', Validators.required),
      onPauseTo: new FormControl('', Validators.required),
      typeOfAbsence: new FormControl('', Validators.required),
      place: new FormControl('', Validators.required)
    })
  }

  update(): void {

    const {type, remoteOrOffice, date, workingFrom, workingTo,
    onPauseFrom, onPauseTo, typeOfAbsence, place} = this.myForm2.value;

    let data; 


    if(type === 'Absence') {


      
        data = {
          _id: this.paramID,
          type,
          remoteOffice: '',
          date,
          workingFrom: '',
          workingTo: '',
          onPauseFrom: '',
          onPauseTo: '',
          typeOfAbsence,
          placeOfBusinessTrip: ''
        }
      

      

      

    } else if(type === 'Presence') {

      data = {
        _id: this.paramID,
        type,
        remoteOffice: remoteOrOffice,
        date,
        workingFrom,
        workingTo,
        onPauseFrom,
        onPauseTo,
        typeOfAbsence: '',
        placeOfBusinessTrip: ''
      }

    } else {

      data = {
        _id: this.paramID,
        type,
        remoteOffice: '',
        date,
        workingFrom: '',
        workingTo: '',
        onPauseFrom: '',
        onPauseTo: '',
        typeOfAbsence: '',
        placeOfBusinessTrip: place
      }

    }

    
      this.sub3 = this.absencePresenceService.editData(data).subscribe(result => {

        if(this.paramType === 'employee') {
          this.router.navigate(['/']);
        } else if(this.paramType === 'admin') {
          this.router.navigate([`/contribution/detail/${this.paramID}`]);
        }

        
      })
    

    

    
  }

  onChange(e): void {
    this.typeOfForm = e.value;
  }

}
