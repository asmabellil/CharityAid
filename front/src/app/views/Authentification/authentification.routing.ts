import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login'
        }
      },
      {
        path: 'register',
        component: RegistrationFormComponent,
        data: {
          title: 'Register'
        }
      },
      {
        path: 'reset',
        component: ResetPasswordComponent,
        data: {
          title: 'Reset Page'
        }
      },
      {
        path: 'reset-password/:id/:token',
        component: ResetComponent,
        data: {
          title: 'Reset Page'
        }
      }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule {}
