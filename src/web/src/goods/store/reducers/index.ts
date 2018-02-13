import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromGoods from './goods.reducer';

export interface IStockState {
  stock: fromGoods.IGoodsState;
}

export const reducers: ActionReducerMap<IStockState> = {
  stock: fromGoods.reducer
};

export const getStockSelector = createFeatureSelector<IStockState>('stock');
