import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRegister } from 'src/app/data/models/UserRegister';
import { UserService } from 'src/app/data/services/user.service';
import { DeleteDialogComponent } from 'src/app/data/dialogs/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  user: UserRegister;

  currentUser: UserRegister;

  idFromParam: string;

  loading: boolean = true;

  errors: any = {
    name: '',
    dateOfBirth: ''
  }

  typeOfUser: string = '';

  private sub1: any;
  private sub2: any;
  private sub3: any;

  showForm: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public userService: UserService,
    private dialog: MatDialog
  ) {
   }

  ngOnInit(): void {

    this.sub3 = this.activatedRoute.params.subscribe(params => {

      const id = params['id'];
      this.idFromParam = id;


        this.sub1 = this.userService.getCurrentUser().subscribe(user => {

          this.currentUser = user;

          if(!this.userService.checkAdmin()) {
            this.router.navigate(['/not-found'])
          }
        })
        
        this.sub2 = this.userService.getUserById(this.idFromParam).subscribe(user => {

          this.user = user;
  
          this.user.dateOfBirth = this.user.dateOfBirth.slice(8, 10) + '.' + this.user.dateOfBirth.slice(5, 7) + '.' + this.user.dateOfBirth.slice(0, 4)
          this.user.hiredDate = this.user.hiredDate.slice(8, 10) + '.' + this.user.hiredDate.slice(5, 7) + '.' + this.user.hiredDate.slice(0, 4)

          if(this.user.type === 'globalAdmin'){
            this.typeOfUser = "Global Admin"
          } else if(this.user.type === 'admin'){
            this.typeOfUser = "Admin"
          } else {
            this.typeOfUser = "User"
          }

          if(this.user.terminationDate) {
            this.user.terminationDate = this.user.terminationDate.slice(8, 10) + '.' + this.user.terminationDate.slice(5, 7) + '.' + this.user.terminationDate.slice(0, 4)
          }
  
          this.loading = false;

        })
        
        
      }
    )
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

  deleteUser(id) {

    const dialogRef = this.dialog.open(DeleteDialogComponent);

    this.sub2 = dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.userService.deleteUser(id).subscribe(result => {
         this.router.navigate(['/employees'])
        })
      }
    })
  

  }


}
