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
    console.log(this.student)
    if (form.valid) {
      this.studentService.createStudent(this.student).subscribe({
        next:()=>{
          this.alert.changeMessage('etudent ajouter', 'success'),
          this.router.navigate(['/home'])
        },
        error:(err)=>{
          console.log(err)
          this.alert.changeMessage(err.error.error.sqlMessage, 'error')
        }
      })

      }else{
        this.alert.changeMessage('les donne sont pas valid', 'success')
      }
  }
}
