import { Component } from '@angular/core';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.css',
})
export class InstructorComponent {
  sidebarOpen = this.sharedService.mobileSidebarOpen;
  constructor(private sharedService: SharedService) {
  }
}
