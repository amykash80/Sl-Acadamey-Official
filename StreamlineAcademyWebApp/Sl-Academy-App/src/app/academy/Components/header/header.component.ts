import { Component, inject } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';

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
  onLogOut() {
    this.shared.logOutUser();
  }
  ngOnInit() {
    this.loggedInUserDetails = JSON.parse(localStorage.getItem('responseObj')!) 
    console.log(this.loggedInUserDetails);
    
  }

}
