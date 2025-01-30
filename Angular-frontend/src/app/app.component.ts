import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentsListComponent } from "./students-list/students-list.component";
import { HeaderComponent } from "./header/header.component";
import { ContentBodyComponent } from "./content-body/content-body.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ContentBodyComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular-frontend';
}
