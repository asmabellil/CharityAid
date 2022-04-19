// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SuperAdminRoutingModule } from './superadmin.routing';
import { ListUsersComponent } from './list-users/list-users.component'

// Components Routing

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuperAdminRoutingModule,

  ],
  declarations: [
    ListUsersComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SuperAdminModule { }
