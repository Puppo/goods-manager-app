import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { take, map, tap } from 'rxjs/operators';

import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.authState$.pipe(
      take(1),
      map(authState => !!authState),
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/auth']);
        }
      })
    );
  }
}
