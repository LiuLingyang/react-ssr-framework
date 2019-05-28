import axios from '@service/axios';

function getTopList() {
  return axios.get('/v8/fcg-bin/fcg_myqq_toplist.fcg', {
    format: 'json'
  });
}

function getTopDetail(id) {
  return axios.get('/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
    type: 'top',
    topid: id,
    format: 'json'
  },
  {
    raw: true
  });
}

export {
  getTopList,
  getTopDetail
};
