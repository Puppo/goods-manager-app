import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { take, map, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromRouteStore from '../../../app/store';
import * as fromAuthStore from '../../store';

@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(protected store: Store<fromAuthStore.IAuthState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(fromAuthStore.getAuthIsAuthenticatedSelector).pipe(
      tap(x => {
        if (x) {
          this.store.dispatch(
            new fromRouteStore.Go({
              path: ['/goods']
            })
          );
        }
      }),
      map(x => !x)
    );
  }
}
