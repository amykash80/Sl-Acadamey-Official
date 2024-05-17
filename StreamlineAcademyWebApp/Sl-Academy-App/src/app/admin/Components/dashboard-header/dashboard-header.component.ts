import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css',
  host: {
    class: 'app-header header-shadow',
  },
})
export class DashboardHeaderComponent {}
