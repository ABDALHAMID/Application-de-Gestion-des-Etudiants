import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../interfaces/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private backendApi = "http://192.168.10.14:3000";
  private subApi = "students"
  private apiUrl =  `${this.backendApi}/${this.subApi}`;


  constructor(private httpClient: HttpClient) { }

  getAllStudents(): Observable<Student[]>{
    console.log("try to get")
    return this.httpClient.get<Student[]>(this.apiUrl)
  }

  getStudent(id: number): Observable<Student>{
    return this.httpClient.get<Student>(`${this.apiUrl}/${id}`)
  }

  createStudent(student: Student): Observable<Student>{
    return this.httpClient.post<Student>(`${this.apiUrl}`, student)
  }

  updateStudent(student: Student): Observable<Student>{
    return this.httpClient.put<Student>(`${this.apiUrl}/${student.id}`, student)
  }

  deleteStudent(id: number): Observable<Student>{
    return this.httpClient.delete<Student>(`${this.apiUrl}/${id}`)
  }



}
