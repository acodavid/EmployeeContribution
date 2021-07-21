import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/data/models/UserRegister';
import { UserService } from 'src/app/data/services/user.service';

@Component({
  selector: 'app-contribution-create',
  templateUrl: './contribution-create.component.html',
  styleUrls: ['./contribution-create.component.scss']
})
export class ContributionCreateComponent implements OnInit {

  errors = {
    date: '',
    workingFrom: '',
    workingTo: '',
    onPauseFrom: '',
    onPauseTo: '',
    place: ''
  }

  loading: boolean = true

  contributionCreateForm: FormGroup;
  dateInput;

  typeOfForm: string;

  users: UserRegister[];

  private sub1: any;


  constructor(
    private userService: UserService,
    private router: Router
  ) { 
    this.composeForm();
   }

  ngOnInit(): void {

    this.sub1 = this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.loading = false
    })

  }

  ngOnDestroy() {
    if(this.sub1){
      this.sub1.unsubscribe();
    }
    
  }

  composeForm(): void {
    this.contributionCreateForm = new FormGroup({
      employee: new FormControl('', Validators.required),
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

  onChange(e): void {
    this.typeOfForm = e.value;
  }

  createContribution(): void {
    console.log(this.contributionCreateForm.value)
    
  }

}
