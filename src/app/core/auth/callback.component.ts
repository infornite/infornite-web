import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core/core.state';
//import { authLogin } from '@app/core/auth/auth.actions';
//import { AuthService } from '@app/core/auth/auth.service';

@Component({
  selector: 'abl-callback',
  template: `
    <p>
      Loading...
    </p>
  `,
  styles: []
})
export class CallbackComponent implements OnInit {
  constructor(
    //private authService: AuthService
    ) { }

  ngOnInit() {
    //this.store.dispatch(authLogin());
    //this.authService.handleAuthCallback();
  }
}