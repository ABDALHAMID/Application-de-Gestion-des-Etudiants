import { Component, Input, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { Student } from '../interfaces/student';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-info',
  standalone: true,
  imports: [],
  templateUrl: './student-info.component.html',
  styleUrl: './student-info.component.scss'
})
export class StudentInfoComponent {

  @Input() student: Student | null = null;
  @ViewChild('studentModal') studentModal!: TemplateRef<any>;

  constructor(private modalService: NgbModal){}

  openModal(student: Student): void {
    this.student = student;
    this.modalService.open(this.studentModal, { size: 'lg', centered: true,  })
  }

}
