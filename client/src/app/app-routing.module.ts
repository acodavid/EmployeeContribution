import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { AuthGuard } from './data/guards/auth.guard';
import { AdminBoardComponent } from './pages/admin-board/admin-board.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PreferenceCreateComponent } from './pages/preference-create/preference-create.component';
import { PreferenceDetailsComponent } from './pages/preference-details/preference-details.component';
import { PreferenceUpdateComponent } from './pages/preference-update/preference-update.component';
import { ProfileDetailsComponent } from './pages/profile-details/profile-details.component';
import { AbsenceCreateComponent } from './pages/absence-create/absence-create.component';
import { PresenceCreateComponent } from './pages/presence-create/presence-create.component';
import { BusinessTripCreateComponent } from './pages/business-trip-create/business-trip-create.component';
import { PresenceAbsenceDetailsComponent } from './pages/presence-absence-details/presence-absence-details.component';
import { AbsenceUpdateComponent } from './pages/absence-update/absence-update.component';
import { ContributionCreateComponent } from './pages/contribution-create/contribution-create.component';
import { SearchContributionsComponent } from './pages/search-contributions/search-contributions.component';
import { ContributionDetailComponent } from './pages/contribution-detail/contribution-detail.component';
import { HolidaysComponent } from './pages/holidays/holidays.component';
import { PositionsComponent } from './pages/positions/positions.component';
import { AbsenceTypeComponent } from './pages/absence-type/absence-type.component';
import { UserPasswordChangeComponent } from './pages/user-password-change/user-password-change.component';


const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'password/change', component: ChangePasswordComponent, canActivate:[AuthGuard]},
  {path: 'user/action/:id', component: RegisterComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'employees', component: AdminBoardComponent, canActivate:[AuthGuard]},
  {path: 'user/profile/:id', component: UserProfileComponent, canActivate:[AuthGuard]},
  {path: 'preference/create', component: PreferenceCreateComponent, canActivate:[AuthGuard]},
  {path: 'preference/details', component: PreferenceDetailsComponent, canActivate:[AuthGuard]},
  {path: 'preference/update/:id', component: PreferenceUpdateComponent, canActivate:[AuthGuard]},
  {path: 'user/profile/current/details', component: ProfileDetailsComponent, canActivate:[AuthGuard]},
  {path: 'absence/create', component: AbsenceCreateComponent, canActivate:[AuthGuard]},
  {path: 'presence/create', component: PresenceCreateComponent, canActivate:[AuthGuard]},
  {path: 'business/trip/create', component: BusinessTripCreateComponent, canActivate:[AuthGuard]},
  {path: 'presence/absence/business/search', component: PresenceAbsenceDetailsComponent, canActivate:[AuthGuard]},
  {path: 'absence/update/:id/:type', component: AbsenceUpdateComponent, canActivate:[AuthGuard]},
  {path: 'contribution/create', component: ContributionCreateComponent, canActivate:[AuthGuard]},
  {path: 'contributions/search', component: SearchContributionsComponent, canActivate:[AuthGuard]},
  {path: 'contribution/detail/:id', component: ContributionDetailComponent, canActivate:[AuthGuard]},
  {path: 'holidays', component: HolidaysComponent, canActivate:[AuthGuard]},
  {path: 'positions', component: PositionsComponent, canActivate:[AuthGuard]},
  {path: 'absence/type', component: AbsenceTypeComponent, canActivate:[AuthGuard]},
  {path: 'user/password/change/:id', component: UserPasswordChangeComponent, canActivate:[AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
