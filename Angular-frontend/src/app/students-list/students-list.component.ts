import { DecimalPipe, AsyncPipe, SlicePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, PipeTransform } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { Student } from '../interfaces/student';
import { StudentService } from '../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AlertServiceService } from '../services/alert-service.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgbHighlight, AsyncPipe, NgbPaginationModule, SlicePipe],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss',
  providers: [DecimalPipe],
})
export class StudentsListComponent implements OnInit {

  students: Student[] = [];
  filteredStudents: Observable<Student[]>;

  filter: FormControl = new FormControl('', { nonNullable: true });
  currentPage = 1;
  itemsPerPage = 10;




  constructor(private studentService: StudentService, private router: Router, private alert: AlertServiceService){
    this.filteredStudents = this.filter.valueChanges.pipe(
			startWith(''),
			map((text) => this.search(text)),
		);
	}



  ngOnInit(): void {
      this.loadStudents();

  }

  loadStudents(){
    console.log("allo")
    this.studentService.getAllStudents().subscribe((data)=>{
      this.students = data;
      this.filter.setValue('');
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
        this.studentService.deleteStudent(id).subscribe({
            next:()=>{
              this.alert.changeMessage('etudent suprimuer', 'success');
              this.students = this.students.filter((student) => student.id !== id);
              this.filteredStudents = this.filter.valueChanges.pipe(
                startWith(''),
                map((text) => this.search(text)),)
            },error:(err)=>{
              console.log(err)
              this.alert.changeMessage(err.error.error.sqlMessage, 'error')
            }
          })
    }
  }

  onPageChange() {
    console.log(this.currentPage)
  }


}
