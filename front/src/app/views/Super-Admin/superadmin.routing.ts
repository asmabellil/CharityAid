import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAssociationsComponent } from './list-associations/list-associations.component';
import { ListUsersComponent } from './list-users/list-users.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        redirectTo: 'allusers'
      },
      {
        path: 'allusers',
        component: ListUsersComponent,
        data: {
          title: 'All users'
        }
      },
      {
        path: 'allassociations',
        component: ListAssociationsComponent,
        data: {
          title: 'All associations'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule {}
