// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { 
  MatGridListModule
} from '@angular/material/grid-list';

// Components Routing
import { AuthentificationRoutingModule } from './authentification.routing';
import { LoginComponent } from './login/login.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ResetComponent } from './reset/reset.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthentificationRoutingModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatGridListModule,

  ],
  declarations: [
    LoginComponent,
    RegistrationFormComponent,
    ResetComponent,
    ResetPasswordComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthentificationModule { }
