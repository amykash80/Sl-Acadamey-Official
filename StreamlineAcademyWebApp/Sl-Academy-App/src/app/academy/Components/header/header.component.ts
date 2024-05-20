import { Component, inject } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  shared=inject(SharedService)
  onLogOut(){
    this.shared.logOutUser();
  }
}
