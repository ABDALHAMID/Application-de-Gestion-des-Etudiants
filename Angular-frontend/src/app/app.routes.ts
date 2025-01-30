import { Routes } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

export const routes: Routes = [
  {path: '', component:StudentsListComponent},
  {path: 'createStudent', component:CreateStudentComponent},
  {path: 'editS/:id', component: EditStudentComponent},
  {path: 'home', component: StudentsListComponent}
];
