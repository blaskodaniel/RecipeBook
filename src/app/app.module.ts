import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { DataService } from './services/data.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import {MomentModule} from 'angular2-moment';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { FilterComponent } from './filter/filter.component';
import { CreateComponent } from './create/create.component';
import { DisplayComponent } from './recipedisplay/display.component';

import {SubStringPipe} from './pipes/substring.pipe';

const appRoutes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
    data: { title: 'Új recept' }
  },
  {
    path: 'display/:id',
    component: DisplayComponent
  },
  {
    path: 'create/:id',
    component: CreateComponent
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    CreateComponent,
    FilterComponent,
    FileSelectDirective,
    DisplayComponent,
    SubStringPipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    MomentModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
