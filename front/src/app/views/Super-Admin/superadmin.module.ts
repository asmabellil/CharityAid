// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SuperAdminRoutingModule } from './superadmin.routing';

// Components Routing
import { ListUsersComponent } from './list-users/list-users.component';
import { ListAssociationsComponent } from './list-associations/list-associations.component'
import { AuthentificationModule } from '../Authentification/authentification.module';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuperAdminRoutingModule,
    AuthentificationModule,
    ModalModule.forRoot()

  ],
  declarations: [
    ListUsersComponent,
    ListAssociationsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SuperAdminModule { }
