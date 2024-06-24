import { Component, inject } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';
import { UserRole } from '../../../Enums/userrole';
import { InstructorComponent } from '../../instructor.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  host: { class: 'app-header header-shadow' },
})
export class HeaderComponent {
  shared = inject(SharedService);
  loggedInUserDetails: any = {};
  filePath = '';
  userRole!: UserRole;
  apiBaseUrl: string = 'http://localhost:5232';
  sidebarOpen = this.shared.mobileSidebarOpen;

  toggleSidebar() {
    this.shared.toggleSidebar();
    console.log(this.sidebarOpen)
  }

  onLogOut() {
    this.shared.logOutUser();
  }
  ngOnInit() {
    this.loggedInUserDetails = JSON.parse(localStorage.getItem('responseObj')!);
    console.log(this.loggedInUserDetails);
    this.userRole = this.loggedInUserDetails.userRole;
    this.filePath = this.loggedInUserDetails.filePath;
  }
}
