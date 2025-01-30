import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Student } from '../interfaces/student';
import { Init } from 'v8';
import { StudentServiceService } from '../student-service.service';
import { StudentService } from '../services/student.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgbHighlight],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss',
  providers: [],
})
export class StudentsListComponent implements OnInit {

  students: Student[] = [];
  filter = new FormControl('', { nonNullable: true });

  constructor(private studentService: StudentService, private router: Router){}


  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe((data)=>{
      this.students = data;
      console.log(data)
    })
  }

  onEdit(student: Student) {
    this.router.navigate(['/editS', student.id]);
  }

  onDelete(id?: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      if(typeof(id)==='number')
        this.studentService.deleteStudent(id).subscribe(() => {
          this.students = this.students.filter((student) => student.id !== id);
        })
      else
      console.error("no id for this etudent");
    }
  }


}
