import { Component } from '@angular/core';
import { StudentsListComponent } from "../students-list/students-list.component";
import { SideBarComponent } from "../side-bar/side-bar.component";

@Component({
  selector: 'app-content-body',
  standalone: true,
  imports: [StudentsListComponent, SideBarComponent],
  templateUrl: './content-body.component.html',
  styleUrl: './content-body.component.scss'
})
export class ContentBodyComponent {

}
