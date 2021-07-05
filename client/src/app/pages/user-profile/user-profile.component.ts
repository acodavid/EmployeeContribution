import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRegister } from 'src/app/data/models/UserRegister';
import { UserService } from 'src/app/data/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: UserRegister;

  idFromParam: string;

  private sub1: any;
  private sub2: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.sub1 = this.userService.getCurrentUser().subscribe(user => {
      if(!user.isAdmin) {
        this.router.navigate(['/not-found'])
      }
    })

    this.activatedRoute.params.subscribe(params => {

      const id = params['id'];
      this.idFromParam = id;

      this.sub2 = this.userService.getUserById(this.idFromParam).subscribe(user => {

        this.user = user;

        this.user.dateOfBirth = this.user.dateOfBirth.slice(8, 10) + '.' + this.user.dateOfBirth.slice(5, 7) + '.' + this.user.dateOfBirth.slice(0, 4)
        this.user.hiredDate = this.user.hiredDate.slice(8, 10) + '.' + this.user.hiredDate.slice(5, 7) + '.' + this.user.hiredDate.slice(0, 4)
        this.user.terminationDate = this.user.terminationDate.slice(8, 10) + '.' + this.user.terminationDate.slice(5, 7) + '.' + this.user.terminationDate.slice(0, 4)

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

}
