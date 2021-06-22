import { Component, OnInit } from '@angular/core';
import { UserRegister } from 'src/app/data/models/UserRegister';
import { UserService } from 'src/app/data/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss']
})
export class AdminBoardComponent implements OnInit {

  displayedColumns: string[] = ['checkbox', 'status', 'name', 'email', 'work-time', 'actions'];
  dataSource: UserRegister[];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.userService.checkAdmin()) {
      this.userService.getUsers().subscribe(users => {
        this.dataSource = users
      })
    } else {
      this.router.navigate(['/not-found'])
    }

   
  }

  deleteUser(id) {
    
    if(window.confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(result => {
        this.dataSource = this.dataSource.filter(({ _id }) => _id !== id);
      })
    }

  }

  filterByName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

      this.userService.getUsers().subscribe(users => {
        this.dataSource = users;
        this.dataSource = this.dataSource.filter(user => user.name.toLowerCase().includes(filterValue.toLowerCase()));
      })
    

    
  }

}
