// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MembersRoutingModule } from './members.routing'

// Components Routing

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MembersRoutingModule

  ],
  declarations: [
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MembersModule { }
