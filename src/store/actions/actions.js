import { SET_CLIENT_LOAD, SET_TOP_LIST, SET_TOP_DETAIL } from '../constants/actionTypes';
import { getTopList, getTopDetail } from '@service';

export function setClientLoad(clientShouldLoad) {
  return { type: SET_CLIENT_LOAD, clientShouldLoad };
}

export function setTopList(topList) {
  return { type: SET_TOP_LIST, topList };
}

export function setTopDetail(topDetail) {
  return { type: SET_TOP_DETAIL, topDetail };
}

export function fetchTopList(data) {
  return (dispatch) => {
    return getTopList(data).then(result => {
      dispatch(setTopList(result.topList));
    });
  };
}

export function fetchTopDetail(data) {
  return (dispatch) => {
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
