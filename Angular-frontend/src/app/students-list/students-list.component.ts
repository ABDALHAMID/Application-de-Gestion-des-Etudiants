import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Student } from '../interfaces/student';
import { Init } from 'v8';
import { StudentServiceService } from '../student-service.service';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgbHighlight],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss',
  providers: [],
})
export class StudentsListComponent implements OnInit {

  studentInfo: Student[] = [];
  filter = new FormControl('', { nonNullable: true });

  constructor(private studentService: StudentServiceService){}


  ngOnInit(): void {
    this.studentInfo = this.studentService.getAllStudents();
  }



}
