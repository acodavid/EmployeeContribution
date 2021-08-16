import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { AdminBoardComponent } from './pages/admin-board/admin-board.component';

import { UserInterceptor } from './data/services/user.interceptor';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { DeleteDialogComponent } from './data/dialogs/delete-dialog/delete-dialog.component';
import { PreferenceCreateComponent } from './pages/preference-create/preference-create.component';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { PreferenceDetailsComponent } from './pages/preference-details/preference-details.component';
import { PreferenceUpdateComponent } from './pages/preference-update/preference-update.component';
import { ProfileDetailsComponent } from './pages/profile-details/profile-details.component';
import { PresenceCreateComponent } from './pages/presence-create/presence-create.component';
import { AbsenceCreateComponent } from './pages/absence-create/absence-create.component';
import { BusinessTripCreateComponent } from './pages/business-trip-create/business-trip-create.component';
import { PresenceAbsenceDetailsComponent } from './pages/presence-absence-details/presence-absence-details.component';
import { AbsenceUpdateComponent } from './pages/absence-update/absence-update.component';
import { ContributionCreateComponent } from './pages/contribution-create/contribution-create.component';
import { SearchContributionsComponent } from './pages/search-contributions/search-contributions.component';
import { ContributionDetailComponent } from './pages/contribution-detail/contribution-detail.component';
import { HolidaysComponent } from './pages/holidays/holidays.component';
import { SnackComponent } from './data/snack/snack/snack.component';
import { PositionsComponent } from './pages/positions/positions.component';
import { AbsenceTypeComponent } from './pages/absence-type/absence-type.component';
import { UserPasswordChangeComponent } from './pages/user-password-change/user-password-change.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    NotFoundComponent,
    ChangePasswordComponent,
    AdminBoardComponent,
    UserProfileComponent,
    DeleteDialogComponent,
    PreferenceCreateComponent,
    PreferenceDetailsComponent,
    PreferenceUpdateComponent,
    ProfileDetailsComponent,
    PresenceCreateComponent,
    AbsenceCreateComponent,
    BusinessTripCreateComponent,
    PresenceAbsenceDetailsComponent,
    AbsenceUpdateComponent,
    ContributionCreateComponent,
    SearchContributionsComponent,
    ContributionDetailComponent,
    HolidaysComponent,
    SnackComponent,
    PositionsComponent,
    AbsenceTypeComponent,
    UserPasswordChangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
