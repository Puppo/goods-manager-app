import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { take, map, tap } from 'rxjs/operators';

import { AuthService } from '../services';

@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.authState$.pipe(
      take(1),
      map(authState => !authState),
      tap(unauthenticated => {
        if (!unauthenticated) {
          this.router.navigate(['/goods']);
        }
      })
    );
  }
}
