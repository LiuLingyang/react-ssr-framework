import { createAction } from 'redux-actions';
import { SET_CLIENT_LOAD, SET_TOP_LIST, SET_TOP_DETAIL } from '../constants/actionTypes';
import { getTopList, getTopDetail } from '@service/index';

export const setClientLoad = createAction(SET_CLIENT_LOAD);

export const setTopList = createAction(SET_TOP_LIST);
export function fetchTopList(data) {
  return dispatch => {
    return getTopList(data).then(result => {
      const list = result.topList.map(item => ({
        id: item.id,
        name: item.topTitle,
        picUrl: item.picUrl
      }));
      dispatch(setTopList(list));
    });
  };
}

export const setTopDetail = createAction(SET_TOP_DETAIL);
export function fetchTopDetail(data) {
  return dispatch => {
    return getTopDetail(data).then(result => {
      const topinfo = result.topinfo;
      const top = {
        id: topinfo.topID,
        name: topinfo.ListName,
        pic: topinfo.pic,
        info: topinfo.info
      };
      dispatch(setTopDetail(top));
    });
  };
}
