import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromAuth from '../../store';

import { AuthProviders } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    protected store: Store<fromAuth.IAuthState>
  ) {
  }

  ngOnInit() {
    // this.layoutService.handleSectionId('sign-in');
    // this.layoutService.handleShowToolbar(false);
    // this.layoutService.handleShowNav(false);
    // this.layoutService.handleShowDetails(false);
  }

  signInWithGoogle(): void {
    this.store.dispatch(new fromAuth.AuthLogin(AuthProviders.Google));
  }

  signInWithTwitter(): void {
    this.store.dispatch(new fromAuth.AuthLogin(AuthProviders.Twitter));
  }

  signInWithFacebook(): void {
    this.store.dispatch(new fromAuth.AuthLogin(AuthProviders.Facebook));
  }
}
