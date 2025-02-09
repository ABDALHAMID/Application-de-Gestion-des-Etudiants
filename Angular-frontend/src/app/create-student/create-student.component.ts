// src/app/components/create-student/create-student.component.ts
import { Component, OnInit } from '@angular/core';
import { Student } from '../interfaces/student';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Filiere } from '../interfaces/filiere.enum';
import { AlertServiceService } from '../services/alert-service.service';
import { error } from 'console';


@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [FormsModule, CommonModule ],
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

  filieres: Filiere[] = [];


  constructor(private studentService: StudentService,
    private router: Router,
    private alert: AlertServiceService,
  ) {}


  ngOnInit(): void {
    this.student.matricule = "etu-"
    this.filieres = Object.values(Filiere);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.studentService.updateStudent(this.student).subscribe({
        next:()=>{
          this.router.navigate(['/home']),
          this.alert.changeMessage('etudent ajouter', 'success')
        },
        error:(err)=>{
          console.log(err)
          this.alert.changeMessage(err.error.error.sqlMessage, 'error')
        }
      })

      }
  }
}
