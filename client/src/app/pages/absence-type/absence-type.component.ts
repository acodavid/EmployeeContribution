import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from 'src/app/data/dialogs/delete-dialog/delete-dialog.component';
import { AbsenceTypeService } from 'src/app/data/services/absence-type.service';
import { UserService } from 'src/app/data/services/user.service';

@Component({
  selector: 'app-absence-type',
  templateUrl: './absence-type.component.html',
  styleUrls: ['./absence-type.component.scss']
})
export class AbsenceTypeComponent implements OnInit {

  absForm: FormGroup;

  dataSource;
  displayedColumns: string[] = ['title', 'actions'];

  loading: boolean = true
  idForEdit: string;
  editForm: boolean = false;
  dataForEdit: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private absenceTypeService: AbsenceTypeService,
    private dialog: MatDialog
  ) {
    this.composeForm();
   }

  ngOnInit(): void {

    if(!this.userService.checkAdmin()) {
      this.router.navigate(['/not-found'])
    } else {

      this.absenceTypeService.getAbsenceTypes().subscribe(data => {
        this.dataSource = data;

        console.log(data)
        this.loading = false
      })

    }

  }

  addAbsenceType(): void {

    if(!this.editForm) {
      const absenceType = {
        title: this.absForm.value.title
      }
  
      this.absenceTypeService.addAbsenceType(absenceType).subscribe(result => {
        location.reload()
      })
    } else {

      this.dataForEdit = {
        _id: this.idForEdit,
        title: this.absForm.value.title
      }

      this.absenceTypeService.updateAbsenceType(this.dataForEdit).subscribe(result => {
        location.reload()
      })

    }

    

  }

  changeToEdit(absenceType): void {
    this.editForm = true

    this.absForm.setValue({
      title: absenceType.title
    })

    this.idForEdit = absenceType._id;
  }

  composeForm(): void { 
    this.absForm = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

}
