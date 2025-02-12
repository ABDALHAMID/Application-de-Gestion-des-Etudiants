import { NgOptimizedImage } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertServiceService } from '../services/alert-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  alertMessage : string = '';
  alertStyle: string = 'none';

  constructor(private alert: AlertServiceService){}
  ngOnInit(): void {
    this.alert.currentAlert.subscribe((data) => {
      this.alertMessage = data.message;
      this.alertStyle = data.style;
      setTimeout(() => {
        this.alertMessage = '';
        this.alertStyle = 'none';
      }, 3000);
    });
  }


  title= 'Gestion Des Etudiants';

  headerClass: boolean = true;
  @HostListener("window:scroll", [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number < 10) {
      this.headerClass = true;
      this.title= 'Gestion Des Etudiants';
    } else if (number < 20) {
      this.headerClass = true;
      this.title= 'Gestion Etudiants';
    } else if (number < 30) {
      this.headerClass = false;
      this.title= 'GesDEtu';
    } else if (number > 40) {
      this.headerClass = false;
      this.title= 'GDE';
    }

  }
}
