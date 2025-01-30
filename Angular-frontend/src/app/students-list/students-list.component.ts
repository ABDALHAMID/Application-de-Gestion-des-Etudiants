import { DecimalPipe, AsyncPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { Student } from '../interfaces/student';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgbHighlight, AsyncPipe],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss',
  providers: [DecimalPipe],
})
export class StudentsListComponent implements OnInit {

  students: Student[] = [];
  filteredStudents: Observable<Student[]>;
  filter: FormControl = new FormControl('', { nonNullable: true });



  constructor(private studentService: StudentService, private router: Router){
    this.filteredStudents = this.filter.valueChanges.pipe(
			startWith(''),
			map((text) => this.search(text)),
		);
	}


  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe((data)=>{
      this.students = data;
      console.log(data)
    })
  }


  search(text: string): Student[] {
    return this.students.filter((student) => {
      const term = text.toLowerCase();
      return (
        student.nom.toLowerCase().includes(term) ||
        student.prenom.toLowerCase().includes(term) ||
        student.matricule.toLowerCase().includes(term)
      );
    });
  }

  onEdit(student: Student) {
    this.router.navigate(['/editS', student.id]);
  }

  onDelete(id?: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      if(typeof(id)==='number')
        this.studentService.deleteStudent(id).subscribe(() => {
          this.students = this.students.filter((student) => student.id !== id);
          this.filteredStudents = this.filter.valueChanges.pipe(
            startWith(''),
            map((text) => this.search(text)),
          );
        })
      else
      console.error("no id for this etudent");
    }
  }


  onSearchChange(){

  }

}
