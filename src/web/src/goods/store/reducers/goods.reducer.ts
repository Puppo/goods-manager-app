import { IGoods } from '../../models';

import * as fromActions from '../actions/goods.actions';

export interface IGoodsState {
  goods: IGoods[];
}

const initialState: IGoodsState = {
  goods: []
};

export function reducer(
  state = initialState,
  action: fromActions.GoodsActions
): IGoodsState {
  switch (action.type) {
    case fromActions.GOODS_LOAD_ACTION:
      return handleGoodsLoadAction(state, action);
    default:
      return state;
  }
}

function handleGoodsLoadAction(
  state: IGoodsState,
  action: fromActions.GoodLoadAction
): IGoodsState {
  const {goods} = action;
  return {
    ...state,
    goods
  };
}

export function getGoods(state: IGoodsState): IGoods[] {
  return state.goods;
}
