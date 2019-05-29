/**
 * raw: 将直接返回 response.data，否则返回 response.data.data
 */
import axios from 'axios';
import toastr from 'toastr';
import { BASEURL } from '@util/consts';

let axiosCache = axios.create({
  timeout: 10000
});

// request 拦截
axiosCache.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    toastr.error('网络异常，请稍后重试');
    Promise.reject(error);
  }
);

axiosCache.interceptors.response.use(
  function (response) {
    let data = response.data.data;
    let ecode = response.data.code;
    let errorMess = response.data.message;
    if (ecode !== 0) {
      switch (ecode) {
      case 1: // 未登录
        location.href = '/login';
        break;
      case 2:
        toastr.error(errorMess);
        break;
      default:
        toastr.error ('网络异常，请稍后重试');
        break;
      }
      // 使pending，这样就不会走到resolve或者rejcet的逻辑了
      return new Promise(() => {});
    } else {
      if (response.config.raw) {
        return response.data;
      }
      return data;
    }
  },
  function (error) {
    toastr.error('网络异常，请稍后重试');
    Promise.reject(error);
  }
);

const cache = {
  request(method) {
    return function (url, data = {}, opts = {}) {
      // 服务端接口需要加上 baseurl
      if (process.env.NODE_ENV === 'server') {
        url = `${BASEURL}${url}`;
      }

      return axiosCache[method](url, {
        ...opts,
        params: data
      });
    };
  }
};

cache.get = cache.request('get');
cache.post = cache.request('post');
cache.put = cache.request('put');
cache.patch = cache.request('patch');
cache.delete = cache.request('delete');

export default cache;
