import { Routes } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { CreateStudentComponent } from './create-student/create-student.component';

export const routes: Routes = [
  {path: '', component:StudentsListComponent},
  {path: 'createStudent', component:CreateStudentComponent}
];
