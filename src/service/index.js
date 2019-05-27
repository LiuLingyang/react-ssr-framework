import axios from 'axios';
import { BASEURL } from '@util/consts';

const topListUrl = '/v8/fcg-bin/fcg_myqq_toplist.fcg';
const topDetailUrl = '/v8/fcg-bin/fcg_v8_toplist_cp.fcg?&type=top';

function getTopList() {
  return axios.get(`${BASEURL}${topListUrl}?format=json`);
}

function getTopDetail(id) {
  return axios.get(`${BASEURL}${topDetailUrl}&topid=${id}&format=json`);
}

export {
  getTopList,
  getTopDetail
};
