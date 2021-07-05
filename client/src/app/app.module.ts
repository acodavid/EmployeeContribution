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
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
