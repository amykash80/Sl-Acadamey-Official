import { Component, inject } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';

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
  loggedInUserDetails: any = {};
  onLogOut() {
    this.shared.logOutUser();
  }
  ngOnInit() {
    this.loggedInUserDetails = JSON.parse(localStorage.getItem('responseObj')!);
    console.log(this.loggedInUserDetails);
  }
}
