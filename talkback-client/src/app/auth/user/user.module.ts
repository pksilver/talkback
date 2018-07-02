import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {RouterModule, Routes} from '@angular/router';

export const UserRoutes: Routes = [{
  path: '',
  component: UserComponent,
  data: {
    breadcrumb: 'User',
    icon: 'icofont icofont-file-document bg-c-pink'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes)
  ],
  declarations: [UserComponent]
})
export class UserModule { }
