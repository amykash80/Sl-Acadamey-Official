import { Component } from '@angular/core';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  sidebarOpen = this.sharedService.mobileSidebarOpen;
  constructor(private sharedService: SharedService) {
  }
}
