import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { AuthGuard } from './data/guards/auth.guard';
import { AdminBoardComponent } from './pages/admin-board/admin-board.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';


const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'password/change', component: ChangePasswordComponent, canActivate:[AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'employees', component: AdminBoardComponent, canActivate:[AuthGuard]},
  {path: 'user/edit/:id', component: UpdateUserComponent, canActivate:[AuthGuard]},
  {path: 'user/profile/:id', component: UserProfileComponent, canActivate:[AuthGuard]},
  {path: '**', component: NotFoundComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
