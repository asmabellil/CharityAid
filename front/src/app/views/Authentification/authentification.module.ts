// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

// Components Routing
import { AuthentificationRoutingModule } from './authentification-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthentificationRoutingModule,

  ],
  declarations: [

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthentificationModule { }
