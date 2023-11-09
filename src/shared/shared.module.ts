import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { StudentFormComponent } from './components/student-form/student-form.component';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [
    StudentFormComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    StudentFormComponent,
    LoaderComponent
  ],
  // providers: [StudentService]
})
export class SharedModule { }
