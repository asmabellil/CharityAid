// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MembersRoutingModule } from './members.routing';
import { ProfileComponent } from './profile/profile.component'
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { 
  MatGridListModule
} from '@angular/material/grid-list';

// Components Routing

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MembersRoutingModule,
    ModalModule.forRoot(),
    MatNativeDateModule,
    MatDatepickerModule,
    MatGridListModule,

  ],
  declarations: [
    
  
    ProfileComponent
  ],
  providers: [
    BsModalRef
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MembersModule { }
