import { Component } from '@angular/core';
import { Student } from '../interfaces/student';
import { FormsModule, NgForm } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.scss'
})
export class CreateStudentComponent {

  student : Student = {
    nom: '',
    prenom: '',
    email: '',
    tel: null,
    date_naissance: '',
    filiere: ''
  };

  constructor(private studentService: StudentService, private router: Router){

  }


  onSubmit(form: NgForm) {
    if (form.valid) {
      this.studentService.createStudent(this.student).subscribe(() => {
        this.router.navigate(['/students']); // Redirect to the student list
      });
    }
  }

}
