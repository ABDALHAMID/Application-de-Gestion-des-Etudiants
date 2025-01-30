import { Component } from '@angular/core';
import { StudentsListComponent } from "../students-list/students-list.component";
import { SideBarComponent } from "../side-bar/side-bar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content-body',
  standalone: true,
  imports: [StudentsListComponent, SideBarComponent, RouterOutlet],
  templateUrl: './content-body.component.html',
  styleUrl: './content-body.component.scss',
})
export class ContentBodyComponent {

}
