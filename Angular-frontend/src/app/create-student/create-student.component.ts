// src/app/components/create-student/create-student.component.ts
import { Component, OnInit } from '@angular/core';
import { Student } from '../interfaces/student';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [FormsModule, AsyncPipe, CommonModule ],
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})

export class CreateStudentComponent implements OnInit{

  student: Student = {
    nom: '',
    prenom: '',
    email: '',
    matricule: '',
    tel: '',
    date_naissance: '',
    filiere: ''
  };

  // studentForm = new FormGroup({
  //   name: new FormControl(this.student.nom, [
  //     Validators.required,
  //   ]),
  //   prenom: new FormControl(this.student.prenom, [
  //     Validators.required,
  //   ]),
  //   email: new FormControl(this.student.email, [
  //     Validators.required,
  //     Validators.email,
  //   ]),
  //   tel: new FormControl(this.student.tel, [
  //     Validators.required,
  //     Validators.maxLength(10),
  //     Validators.minLength(10),
  //     Validators.pattern("0*")
  //   ]),
  //   matricule: new FormControl(this.student.matricule, [
  //     Validators.required,
  //     Validators.maxLength(4),
  //     Validators.minLength(10),
  //     Validators.pattern("etu*")
  //   ]),
  //   date_naissance: new FormControl(this.student.date_naissance, [
  //     Validators.required,
  //   ]),
  //   filiere: new FormControl(this.student.filiere, [
  //     Validators.required,
  //   ]),



  // });



  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.studentService.createStudent(this.student).subscribe(() => {
        this.router.navigate(['/home']); // Redirect to the student list
      });
    }
  }
}
