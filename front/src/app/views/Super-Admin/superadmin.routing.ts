import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociationFormComponent } from './association-form/association-form.component';
import { ListAssociationsComponent } from './list-associations/list-associations.component';
import { ListUsersComponent } from './list-users/list-users.component'
import { RequestsComponent } from './requests/requests.component';

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
      {
        path: 'formassociation',
        component: AssociationFormComponent,
        data: {
          title: 'All associations'
        }
      },
      {
        path: 'requests',
        component: RequestsComponent,
        data: {
          title: 'Requests'
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
