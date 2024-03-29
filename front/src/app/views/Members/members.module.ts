// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MembersRoutingModule } from './members.routing';
import { ProfileComponent } from './profile/profile.component'
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { EventsComponent } from './events/events.component';
import { EventFormComponent } from './event-form/event-form.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { SingleTaskComponent } from './single-task/single-task.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { NgxDropzoneModule } from 'ngx-dropzone';

  import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListSubscribersComponent } from './list-subscribers/list-subscribers.component';
import { SubscriberFormComponent } from './subscriber-form/subscriber-form.component';
import {MatSelectModule} from '@angular/material/select';
import { ListContactsComponent } from './list-contacts/list-contacts.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CaisseComponent } from './caisse/caisse.component';
import { CaisseFormComponent } from './caisse-form/caisse-form.component';
import { CalanderEventComponent } from './calander-event/calander-event.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventDescriptionComponent } from './event-description/event-description.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { PDFsComponent } from './pdfs/pdfs.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ReportsComponent } from './reports/reports.component';
import {MatStepperModule} from '@angular/material/stepper';
import { AnnuelReportComponent } from './financial-report/financial-report.component';
import { ProfileAssociationComponent } from './profile-association/profile-association.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

// Components Routing

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MembersRoutingModule,
    ModalModule.forRoot(),
    MatNativeDateModule,
    MatDatepickerModule,
    MatGridListModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule, 
    MatFormFieldModule,
    MatDialogModule,
    MatExpansionModule,
    MatSelectModule,
    FullCalendarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatRadioModule,
    AngularEditorModule,
    MatStepperModule,
    NgxDropzoneModule

  ],
  declarations: [
    
    EventsComponent,
    EventFormComponent,
    ProfileComponent,
    TasksComponent,
    TaskFormComponent,
    SingleTaskComponent,
    ListSubscribersComponent,
    SubscriberFormComponent,
    ListContactsComponent,
    ContactFormComponent,
    CaisseComponent,
    CaisseFormComponent,
    CalanderEventComponent,
    EventDescriptionComponent,
    PDFsComponent,
    ReportsComponent,
    AnnuelReportComponent,
    ProfileAssociationComponent
  ],
  providers: [
    BsModalRef,
    {provide:MatDialogRef , useValue:{} },

    { provide: MAT_DIALOG_DATA, useValue: {} },
    {provide: MAT_DATE_LOCALE, useValue: { useUtc: true }},
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MembersModule { }
