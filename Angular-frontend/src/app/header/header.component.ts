import { NgOptimizedImage } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title= 'GESTION DES ETUDIANTS';

  headerClass: boolean = true;
  @HostListener("window:scroll", [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number < 10) {
      this.headerClass = true;
      this.title= 'GESTION DES ETUDIANTS';
    } else if (number > 10) {
      this.headerClass = false;
      this.title= 'GDE';
    }

  }
}
