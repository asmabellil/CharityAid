import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
        //component: ,
        data: {
          title: 'allusers'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule {}
