import { createSelector } from '@ngrx/store';

import { IGoods } from '../../models';

import * as fromRoute from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromGoods from '../reducers/goods.reducer';

export const getStockStateSelector = createSelector(
  fromFeature.getStockSelector,
  (state: fromFeature.IStockState) => state.stock
);

export const getStockGoodsSelector = createSelector(
  getStockStateSelector,
  fromGoods.getGoods
);

export const getStockSelectedGoodsSelector = createSelector(
  getStockGoodsSelector,
  fromRoute.getRouterState,
  (state, router): IGoods => !!router.state ? state.find(g => g.$key === router.state.params.id) : null
);


