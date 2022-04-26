// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MembersRoutingModule } from './members.routing';
import { ProfileComponent } from './profile/profile.component'

// Components Routing

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MembersRoutingModule

  ],
  declarations: [
    
  
    ProfileComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MembersModule { }
