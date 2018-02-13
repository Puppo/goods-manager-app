import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { IGoods } from '../../../models/goods.model';
import { switchMap, map, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/database';

import { Store } from '@ngrx/store';
import * as fromAuth from '../../../../auth/store';
import * as fromActions from '../../../store/actions';

@Injectable()
export class GoodsService {
  goods$ = this.store.select(fromAuth.getAuthUserIdSelector)
  .pipe(
    switchMap(uid => this.db.list<IGoods>(`goods/${uid}`).snapshotChanges()),
    map(actions => {
      return actions.map(a => {
        const data = a.payload.val();
        const $key = a.payload.key;
        return { $key, ...data };
      });
    })
  )
  .subscribe((goods) => this.store.dispatch(new fromActions.GoodLoadAction(goods)));
  constructor(
    protected db: AngularFireDatabase,
    protected store: Store<fromAuth.IAuthState>
  ) { }

  // get(key: string) {
  //   if (!key) {
  //     return Observable.of({});
  //   }
  //   return this.store.select<IGoods[]>()
  //     .filter(Boolean)
  //     .map(goods => goods.find((good: IGoods) => good.$key === key));
  // }
  insert(goods: IGoods) {
    return this.store.select(fromAuth.getAuthUserIdSelector)
    .pipe(
      map(async uid => await this.db.list(`goods/${uid}`).push(goods))
    );
  }
  update(key: string, goods: IGoods) {
    return this.store.select(fromAuth.getAuthUserIdSelector)
    .pipe(
      switchMap(async uid => await this.db.object(`goods/${uid}/${key}`).update(goods))
    );
  }
  remove(key: string): Observable<void> {
    return this.store.select(fromAuth.getAuthUserIdSelector)
    .pipe(
      switchMap(async uid => await this.db.list(`goods/${uid}/${key}`).remove())
    );
  }
}
