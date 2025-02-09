import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  private alert = new BehaviorSubject<{message: string, style: string}>({
    message: '',
    style: '',
  });

  currentAlert = this.alert.asObservable();

  changeMessage(message: string, style: string){
    this.alert.next({message, style});
  }

  constructor() { }
}
