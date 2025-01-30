import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Student } from '../interfaces/student';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.scss',
  providers: [DatePipe]
})
export class EditStudentComponent implements OnInit {
  studentId!: number;
  student! : Student;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe){
  }
  ngOnInit(): void {
    this.studentId = +this.route.snapshot.paramMap.get("id")!;
    this.studentService.getStudent(this.studentId).subscribe((data)=> {
      data.date_naissance = this.datePipe.transform(data.date_naissance, 'yyyy-MM-dd');
      this.student = data
    })
  }


  onSubmit(form: NgForm) {
    if (form.valid) {
      this.studentService.updateStudent(this.student).subscribe(() => {
        this.router.navigate(['/students']); // Redirect to the student list
      });
    }
  }
}
