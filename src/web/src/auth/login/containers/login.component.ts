import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    protected auth: AuthService,
    protected router: Router
  ) {
  }

  ngOnInit() {
    // this.layoutService.handleSectionId('sign-in');
    // this.layoutService.handleShowToolbar(false);
    // this.layoutService.handleShowNav(false);
    // this.layoutService.handleShowDetails(false);
  }

  async signInWithGoogle(): Promise<void> {
    await this.auth.signInWithGoogle();
    this.postSignIn();
  }

  async signInWithTwitter(): Promise<void> {
    await this.auth.signInWithTwitter();
    this.postSignIn();
  }

  async signInWithFacebook(): Promise<void> {
    await this.auth.signInWithFacebook();
    this.postSignIn();
  }

  private postSignIn(): void {
    this.router.navigate(['/goods']);
  }
}
