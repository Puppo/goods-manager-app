import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of } from 'rxjs/observable/of';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import * as fromAuth from '../../../auth/store';
import * as fromRoute from '../../../app/store';

import { GoodsService } from '../../shared/services';
import * as fromActions from '../actions/goods.actions';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class GoodsEffect {
  constructor(
    protected actions$: Actions,
    protected store: Store<fromAuth.IAuthState>,
    protected goodsSv: GoodsService,
    public snackBar: MatSnackBar
  ) {}

  @Effect()
  insert$ = this.actions$
    .ofType<fromActions.GoodInsertAction>(fromActions.GOODS_INSERT_ACTION)
    .pipe(
      switchMap(action => {
        const { goods } = action;
        return this.goodsSv.insert(goods).pipe(
          map(() => new fromActions.GoodInsertSuccessAction()),
          catchError(error => {
            console.log(error);
            return of(new fromActions.GoodInsertFailAction());
          })
        );
      })
    );

  @Effect()
  update$ = this.actions$
    .ofType<fromActions.GoodUpdateAction>(fromActions.GOODS_UPDATE_ACTION)
    .pipe(
      switchMap(action => {
        const { goods } = action;
        return this.goodsSv.update(goods.$key, goods).pipe(
          map(() => new fromActions.GoodUpdateSuccessAction()),
          catchError(error => {
            console.log(error);
            return of(new fromActions.GoodUpdateFailAction());
          })
        );
      })
    );

  @Effect()
  remove$ = this.actions$
    .ofType<fromActions.GoodRemoveAction>(fromActions.GOODS_REMOVE_ACTION)
    .pipe(
      switchMap(action => {
        const { key } = action;
        return this.goodsSv.remove(key).pipe(
          map(() => new fromActions.GoodRemoveSuccessAction()),
          catchError(error => {
            console.log(error);
            return of(new fromActions.GoodRemoveFailAction());
          })
        );
      })
    );

  @Effect()
  insertOrUpdateSuccess$ = this.actions$
    .ofType(
      fromActions.GOODS_INSERT_SUCCESS_ACTION,
      fromActions.GOODS_UPDATE_SUCCESS_ACTION
    )
    .pipe(
      map(
        action =>
          new fromRoute.Go({
            path: ['/goods']
          })
      )
    );

  @Effect({ dispatch: false })
  removeSuccess$ = this.actions$
    .ofType(
      fromActions.GOODS_REMOVE_ACTION
    )
    .pipe(
      tap(
        action => this.snackBar.open('Goods remove', null, { duration: 1000 })
      )
    );
}
