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
import {MatSelectModule} from '@angular/material/select';

// Components Routing
import { AuthentificationRoutingModule } from './authentification.routing';
import { LoginComponent } from './login/login.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ResetComponent } from './reset/reset.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegitrationPageComponent } from './regitration-page/regitration-page.component';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationFormComponent,
    ResetComponent,
    ResetPasswordComponent,
    RegitrationPageComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthentificationRoutingModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatGridListModule,
    ModalModule.forRoot(),
    MatSelectModule

  ],
  exports: [
    RegistrationFormComponent
  ],
  providers: [
    BsModalRef
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthentificationModule { }
