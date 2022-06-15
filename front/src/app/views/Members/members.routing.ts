import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventFormComponent } from './event-form/event-form.component';
import { EventsComponent } from './events/events.component';
import { ProfileComponent } from './profile/profile.component';
import { TasksComponent } from './tasks/tasks.component';
import { SingleTaskComponent } from './single-task/single-task.component'
import { ListSubscribersComponent } from './list-subscribers/list-subscribers.component';
import { SubscriberFormComponent } from './subscriber-form/subscriber-form.component';
import { ListContactsComponent } from './list-contacts/list-contacts.component';
import { CaisseComponent } from './caisse/caisse.component';
import { CalanderEventComponent } from './calander-event/calander-event.component';
import { PDFsComponent } from './pdfs/pdfs.component'
import { ReportsComponent } from './reports/reports.component';

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
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'Profile'
        }
      },
      {
        path: 'allevents',
        component: EventsComponent,
        data: {
          title: 'All events'
        }
      },
      {
        path: 'formEvent',
        component: EventFormComponent,
        data: {
          title: 'All events'
        }
      },
      {
        path: 'alltasks',
        component: TasksComponent,
        data: {
          title: 'All tasks'
        }
      },
      {
        path: 'allsubscribers',
        component: ListSubscribersComponent,
        data: {
          title: 'All subscribers'
        }
      },
      {
        path: 'formsubscribers',
        component: SubscriberFormComponent,
        data: {
          title: 'subscribers'
        }
      },
      {
        path: 'allcontacts',
        component: ListContactsComponent,
        data: {
          title: 'All contacts'
        }
      },
      {
        path: 'caisses',
        component: CaisseComponent,
        data: {
          title: 'Caisse'
        }
      },
      {
        path: 'calander',
        component: CalanderEventComponent,
        data: {
          title: 'All Tasks'
        }
      },
      {
        path: 'annuel',
        component: PDFsComponent,
        data: {
          title: 'Reports'
        }
      },
      {
        path: 'reports',
        component: ReportsComponent,
        data: {
          title: 'Reports'
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
