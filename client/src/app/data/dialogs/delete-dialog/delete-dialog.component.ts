import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  checker: string;

  constructor(
  ) { 
    
  }

  ngOnInit(): void {
  }


  change(event) {
    const filterValue = (event.target as HTMLInputElement).value;

    console.log(filterValue)

    this.checker = filterValue

  }

}
