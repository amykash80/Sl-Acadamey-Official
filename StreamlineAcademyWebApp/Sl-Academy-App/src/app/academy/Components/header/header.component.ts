import { Component, inject } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';
import { UserRole } from '../../../Enums/userrole';
import { ProfileComponent } from '../../../shared/Pages/profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  host: {
    class: 'app-header header-shadow',
  },
})
export class HeaderComponent {
  constructor(private shared:SharedService){}
  loggedInUserDetails:any = {};
  userRole!:UserRole
  filepath=''
  apiBaseUrl: string = 'https://api.streamlineacademies.com';
  sidebarOpen = this.shared.mobileSidebarOpen;
  toggleSidebar() {
    this.shared.toggleSidebar();
    console.log(this.sidebarOpen)
  }

  onLogOut() {
    this.shared.logOutUser();
  }
  ngOnInit() {
    this.loggedInUserDetails = JSON.parse(localStorage.getItem('responseObj')!) 
    console.log(this.loggedInUserDetails);
    this.userRole = this.loggedInUserDetails.userRole;
    this.filepath=this.loggedInUserDetails.filePath;

  }

}
