import { Component, inject } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';
import { UserRole } from '../../../Enums/userrole';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css',
  host: {
    class: 'app-header header-shadow',
  },
})
export class DashboardHeaderComponent {
  shared = inject(SharedService);

  userRole!:UserRole
  filePath!:string
  apiBaseUrl: string = 'https://api.streamlineacademies.com';
  sidebarOpen = this.shared.mobileSidebarOpen;
  toggleSidebar() {
    this.shared.toggleSidebar();
    console.log(this.sidebarOpen)
  }

  constructor(){
    this.loggedInUserDetails = JSON.parse(localStorage.getItem('responseObj')!);
    console.log(this.loggedInUserDetails);
    this.userRole = this.loggedInUserDetails.userRole;
    this.filePath=this.loggedInUserDetails.filePath;
    console.log(this.userRole);
    
  }
  loggedInUserDetails: any = {};
  onLogOut() {
    this.shared.logOutUser();
  }
  ngOnInit() {

}
}
