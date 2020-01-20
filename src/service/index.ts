import axios from '@service/axios';

function getTopList({ cookies }) {
  return axios.get('/v8/fcg-bin/fcg_myqq_toplist.fcg', {
    format: 'json',
    cookies
  });
}

function getTopDetail({ id, cookies }) {
  return axios.get(
    '/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
    {
      type: 'top',
      topid: id,
      format: 'json',
      cookies
    },
    {
      raw: true
    }
  );
}

export { getTopList, getTopDetail };
