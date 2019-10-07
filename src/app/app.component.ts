import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event} from '@angular/router';

@Component({
  selector: 'app-root',
  template:` 
    <router-outlet></router-outlet>
    <ngx-loading [show]="loading" [config]="{ backdropBorderRadius: '3px' }"></ngx-loading> `
})
export class AppComponent {
  title = 'bulbulstudio';
  public loading = false;

  constructor(private _router: Router){
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.loading = true;
      }

      if (routerEvent instanceof NavigationEnd ||
          routerEvent instanceof NavigationError ||
          routerEvent instanceof NavigationCancel) {
            window.scrollTo(0, 0);
            this.loading = false;
      }
    });
  }

}
