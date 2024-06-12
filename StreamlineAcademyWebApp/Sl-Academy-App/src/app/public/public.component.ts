import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrl: './public.component.css'
})
export class PublicComponent {
  showHeaderFooter: boolean = true;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.urlAfterRedirects);
      }
    });
  }

  checkRoute(url: string) {
    const hideHeaderFooterRoutes = ['/change-password'];
    this.showHeaderFooter = !hideHeaderFooterRoutes.includes(url);
    this.cdr.detectChanges();  
  }

  onActivate(event: any) {
    window.scroll(0, 0);
  }
}
