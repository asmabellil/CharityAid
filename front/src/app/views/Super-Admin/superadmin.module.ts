// Angular
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SuperAdminRoutingModule } from './superadmin.routing';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import { NgxDropzoneModule } from 'ngx-dropzone';

// Components Routing
import { ListUsersComponent } from './list-users/list-users.component';
import { ListAssociationsComponent } from './list-associations/list-associations.component'
import { AuthentificationModule } from '../Authentification/authentification.module';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { AssociationFormComponent } from './association-form/association-form.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RequestsComponent } from './requests/requests.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuperAdminRoutingModule,
    AuthentificationModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatGridListModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    NgxDropzoneModule,

  ],
  declarations: [
    ListUsersComponent,
    ListAssociationsComponent,
    AssociationFormComponent,
    RequestsComponent,
  ],
  providers: [
    DatePipe,
    BsModalRef,
    MatDialog
  ],
  exports:[
    AssociationFormComponent
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SuperAdminModule { }
