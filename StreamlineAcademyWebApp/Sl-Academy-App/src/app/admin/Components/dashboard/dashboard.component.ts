import { Component, inject } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public shared:SharedService){}
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  onLogOut(){
    this.shared.logOutUser();
  }

}
