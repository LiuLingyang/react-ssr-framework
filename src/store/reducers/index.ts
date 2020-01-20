import { combineReducers } from 'redux';
import * as ActionTypes from '../constants/actionTypes';
import check from '../enhancers/check';
import { TopDetailAction, TopListAction, SetClientAction } from '@store/constants/actionTypes';

const initialState = {
  clientShouldLoad: process.env.REACT_ENV !== 'server',
  topList: [],
  topDetail: {}
};

function clientShouldLoad(clientShouldLoad = initialState.clientShouldLoad, action: SetClientAction) {
  switch (action.type) {
    case ActionTypes.SET_CLIENT_LOAD:
      return action.payload;
    default:
      return clientShouldLoad;
  }
}

function topList(topList = initialState.topList, action: TopListAction) {
  switch (action.type) {
    case ActionTypes.SET_TOP_LIST:
      return action.payload;
    default:
      return topList;
  }
}

function topDetail(topDetail = initialState.topDetail, action: TopDetailAction) {
  switch (action.type) {
    case ActionTypes.SET_TOP_DETAIL:
      return action.payload;
    default:
      return topDetail;
  }
}

const reducer = combineReducers({
  clientShouldLoad,
  topList,
  topDetail
});

export default check(reducer);
