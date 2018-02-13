import { Action } from '@ngrx/store';
import { IGoods } from '../../models/goods.model';

export const GOODS_LOAD_ACTION = '[Goods] Load';
export class GoodLoadAction implements Action {
  readonly type = GOODS_LOAD_ACTION;
  constructor(public goods: IGoods[]) {}
}

export const GOODS_INSERT_ACTION = '[Goods] Insert';
export class GoodInsertAction implements Action {
  readonly type = GOODS_INSERT_ACTION;
  constructor(public goods: IGoods) {}
}

export const GOODS_INSERT_SUCCESS_ACTION = '[Goods] Insert Success';
export class GoodInsertSuccessAction implements Action {
  readonly type = GOODS_INSERT_SUCCESS_ACTION;
}
export const GOODS_INSERT_FAIL_ACTION = '[Goods] Insert Fail';
export class GoodInsertFailAction implements Action {
  readonly type = GOODS_INSERT_FAIL_ACTION;
}

export const GOODS_UPDATE_ACTION = '[Goods] Update';
export class GoodUpdateAction implements Action {
  readonly type = GOODS_UPDATE_ACTION;
  constructor(public goods: IGoods) {}
}

export const GOODS_UPDATE_SUCCESS_ACTION = '[Goods] Update Success';
export class GoodUpdateSuccessAction implements Action {
  readonly type = GOODS_UPDATE_SUCCESS_ACTION;
}
export const GOODS_UPDATE_FAIL_ACTION = '[Goods] Update Fail';
export class GoodUpdateFailAction implements Action {
  readonly type = GOODS_INSERT_FAIL_ACTION;
}


export const GOODS_REMOVE_ACTION = '[Goods] Remove';
export class GoodRemoveAction implements Action {
  readonly type = GOODS_REMOVE_ACTION;
  constructor(public key: string) {}
}

export const GOODS_REMOVE_SUCCESS_ACTION = '[Goods] Remove Success';
export class GoodRemoveSuccessAction implements Action {
  readonly type = GOODS_REMOVE_SUCCESS_ACTION;
}
export const GOODS_REMOVE_FAIL_ACTION = '[Goods] Remove Fail';
export class GoodRemoveFailAction implements Action {
  readonly type = GOODS_REMOVE_FAIL_ACTION;
}

export type GoodsActions
  = GoodLoadAction
  | GoodInsertAction
  | GoodInsertSuccessAction
  | GoodInsertFailAction
  | GoodUpdateAction
  | GoodUpdateSuccessAction
  | GoodUpdateFailAction
  | GoodRemoveAction
  | GoodRemoveSuccessAction
  | GoodRemoveFailAction;
