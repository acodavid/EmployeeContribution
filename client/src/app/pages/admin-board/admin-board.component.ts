import { Component, OnInit } from '@angular/core';
import { UserRegister } from 'src/app/data/models/UserRegister';
import { UserService } from 'src/app/data/services/user.service';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/data/dialogs/delete-dialog/delete-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss']
})
export class AdminBoardComponent implements OnInit {

  displayedColumns: string[] = ['checkbox', 'status', 'name', 'email', 'work-time', 'actions'];
  dataSource: UserRegister[];

  loading: boolean = true;

  private sub1: any;
  private sub2: any;
  private sub3: any;

  // todays date
  today: Date = new Date();

  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if(this.userService.checkAdmin()) {
      this.sub1 = this.userService.getUsers().subscribe(users => {
        this.dataSource = users;
        this.loading = false;
      })
    } else {
      this.router.navigate(['/not-found'])
    }

   
  }

  ngOnDestroy() {
    if(this.sub1) {
      this.sub1.unsubscribe();
    }

    if(this.sub2) {
      this.sub2.unsubscribe();
    }

    if(this.sub3) {
      this.sub3.unsubscribe();
    }
  } 

  deleteUser(id) {

    const dialogRef = this.dialog.open(DeleteDialogComponent);

    this.sub2 = dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.sub3 = this.userService.deleteUser(id).subscribe(result => {
          this.dataSource = this.dataSource.filter(({ _id }) => _id !== id);
        })
      }
    })
  

  }

  filterByName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

      this.sub1 = this.userService.getUsers().subscribe(users => {
        this.dataSource = users;
        this.dataSource = this.dataSource.filter(user => user.name.toLowerCase().includes(filterValue.toLowerCase()));
      })
    

    
  }

}
