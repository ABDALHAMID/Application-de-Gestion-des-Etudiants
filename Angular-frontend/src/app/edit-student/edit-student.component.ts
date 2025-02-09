import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Student } from '../interfaces/student';
import { CommonModule, DatePipe } from '@angular/common';
import { Filiere } from '../interfaces/filiere.enum';
import { AlertServiceService } from '../services/alert-service.service';
import { error } from 'console';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.scss',
  providers: [DatePipe]
})
export class EditStudentComponent implements OnInit {
  studentId!: number;
  student! : Student;
  filieres: Filiere[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private alert: AlertServiceService
  ){
  }
  ngOnInit(): void {
    this.studentId = +this.route.snapshot.paramMap.get("id")!;
    this.studentService.getStudent(this.studentId).subscribe((data)=> {
      data.date_naissance = this.datePipe.transform(data.date_naissance, 'yyyy-MM-dd');
      console.log(data)
      this.student = data
    })
    this.filieres = Object.values(Filiere);
  }


  onSubmit(form: NgForm) {
    if (form.valid) {
      this.studentService.updateStudent(this.student).subscribe({
        next:()=>{
          this.router.navigate(['/home']),
          this.alert.changeMessage('etudent modifier', 'success')
        },
        error:(err)=>{
          console.log(err)
          this.alert.changeMessage(err.error.error.sqlMessage, 'error')
        }
      })

      }
  }
}
