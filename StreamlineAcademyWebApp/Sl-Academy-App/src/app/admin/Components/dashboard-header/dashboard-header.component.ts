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
  userRole!:UserRole
  constructor(){
    this.loggedInUserDetails = JSON.parse(localStorage.getItem('responseObj')!);
    console.log(this.loggedInUserDetails);
    this.userRole = this.loggedInUserDetails.userRole;
    console.log(this.userRole);
    
  }
  shared = inject(SharedService);
  loggedInUserDetails: any = {};
  onLogOut() {
    this.shared.logOutUser();
  }
  ngOnInit() {

}
}
