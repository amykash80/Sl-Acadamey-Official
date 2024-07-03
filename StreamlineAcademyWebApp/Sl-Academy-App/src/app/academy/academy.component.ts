import { Component } from '@angular/core';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrl: './academy.component.css'
})
export class AcademyComponent {
  sidebarOpen = this.sharedService.mobileSidebarOpen;
  constructor(private sharedService: SharedService) {
  }
}
