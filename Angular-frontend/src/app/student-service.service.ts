import { Injectable } from '@angular/core';
import { studentInfo } from '../student-data';
import { Student } from './interfaces/student';


@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  constructor() { }

  private students: Student[] = studentInfo;

  getAllStudents(): Student[] {
    return this.students;
  }
}
