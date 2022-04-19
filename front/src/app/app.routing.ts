import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/Authentification/login/login.component';
import { AuthGuard } from './services/auth.guard'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'main',
        loadChildren: () => import('./views/Super-Admin/superadmin.module').then(m => m.SuperAdminModule), canActivate: [AuthGuard]
      },
      {
        path: 'members',
        loadChildren: () => import('./views/Members/members.module').then(m => m.MembersModule), canActivate: [AuthGuard]
      }, 
    ]
  },
  {
    path: '',
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '', //can add authentification for the url
        loadChildren: () => import('./views/Authentification/authentification.module').then(m => m.AuthentificationModule)
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
