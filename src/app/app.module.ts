import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { DataService } from './services/data.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { FilterComponent } from './filter/filter.component';
import { CreateComponent } from './create/create.component';
import { FileUploadComponent } from './fileupload/upload.components';
import { DisplayComponent } from './RecipeDisplay/display.component';

import {SubStringPipe} from './tools/substring.pipe';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Főmenü' }
  },
  {
    path: 'create',
    component: CreateComponent,
    data: { title: 'Új recept' }
  },
  {
    path: 'upload',
    component: FileUploadComponent,
    data: { title: 'Fénykép feltöltése' }
  },
  {
    path: 'display/:id',
    component: DisplayComponent
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
    FileUploadComponent,
    DisplayComponent,
    SubStringPipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
