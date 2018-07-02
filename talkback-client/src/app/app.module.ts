import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserComponent } from './auth/user/user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { DefaultLayoutComponent } from './core/default-layout/default-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { ToastrModule } from 'ngx-toastr';

export const AppRoutes: Routes = [
  // { path:'',redirectTo:'/login', pathMatch:'full' },
  { path:'login', component:LoginComponent },
  { path:'signup', component:SignupComponent },
  { path:'dashboard', component:DefaultLayoutComponent },
  { path:'dashboard/create',component:UserComponent },
  { path:'**',component:PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    PageNotFoundComponent,
    DefaultLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
