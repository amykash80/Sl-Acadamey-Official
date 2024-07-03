import { Component } from '@angular/core';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  sidebarOpen = this.sharedService.mobileSidebarOpen;
  constructor(private sharedService: SharedService) {
  }
}
