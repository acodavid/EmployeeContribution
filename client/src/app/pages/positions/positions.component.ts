import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from 'src/app/data/dialogs/delete-dialog/delete-dialog.component';
import { PositionServiceService } from 'src/app/data/services/position-service.service';
import { UserService } from 'src/app/data/services/user.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {

  posForm: FormGroup;

  dataSource;
  displayedColumns: string[] = ['title', 'actions'];

  loading: boolean = true
  idForEdit: string;
  editForm: boolean = false;
  dataForEdit: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private positionService: PositionServiceService,
    private dialog: MatDialog
  ) { 
    this.composeForm();
  }

  ngOnInit(): void {
    if(!this.userService.checkAdmin()) {
      this.router.navigate(['/not-found'])
    } else {

      this.positionService.getPositions().subscribe(data => {
        this.dataSource = data;
        this.loading = false
      })

    }
  }

  addPosition(): void {

    if(!this.editForm) {
      const position = {
        title: this.posForm.value.title
      }
  
      this.positionService.addPosition(position).subscribe(result => {
        location.reload()
      })
    } else {

      this.dataForEdit = {
        _id: this.idForEdit,
        title: this.posForm.value.title
      }

      this.positionService.updatePostion(this.dataForEdit).subscribe(result => {
        location.reload()
      })

    }

    

  }

  composeForm(): void { 
    this.posForm = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  changeToEdit(position): void {
    this.editForm = true

    this.posForm.setValue({
      title: position.title
    })

    this.idForEdit = position._id;
  }

  deletePosition(id): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
     
      if(result) {
        this.positionService.deletePosition(id).subscribe(result => {
          this.dataSource = this.dataSource.filter(({ _id }) => _id !== id);
        })
      }
      
    })
  }

}
