/**
 * raw: 将直接返回 response.data，否则返回 response.data.data
 */

import axios from 'axios';
import toastr from 'toastr';
import { BASEURL } from '@shared/consts';

const parseCookie = cookies => {
  let cookie = '';
  Object.keys(cookies).forEach(item => {
    cookie += item + '=' + cookies[item] + '; ';
  });
  return cookie;
};

let axiosCache = axios.create({
  withCredentials: true,
  timeout: 10000
});

// request 拦截
axiosCache.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    process.env.REACT_ENV !== 'server' && toastr.error('网络异常，请稍后重试');
    Promise.reject(error);
  }
);

axiosCache.interceptors.response.use(
  function(response: any) {
    let data = response.data.data;
    let ecode = response.data.code;
    let errorMess = response.data.message;
    // 返回全量数据
    if (response.config.raw) {
      return response.data;
    }
    if (ecode !== 0) {
      switch (ecode) {
        case 1: // 未登录
          location.href = '/login';
          break;
        case 2:
          process.env.REACT_ENV !== 'server' && toastr.error(errorMess);
          break;
        default:
          process.env.REACT_ENV !== 'server' && toastr.error('网络异常，请稍后重试');
          break;
      }
      // 使pending，这样就不会走到resolve或者rejcet的逻辑了
      return new Promise(() => {});
    } else {
      return data;
    }
  },
  function(error) {
    process.env.REACT_ENV !== 'server' && toastr.error('网络异常，请稍后重试');
    Promise.reject(error);
  }
);

const cache: any = {
  request(method) {
    return function(url, data: any = {}, opts: any = {}) {
      // 服务端接口需要加上 baseurl
      if (process.env.REACT_ENV === 'server') {
        url = `${BASEURL}${url}`;
      }
      // 处理 cookie
      let cookies;
      if (data.cookies) {
        cookies = data.cookies;
        delete data.cookies;

        let headers = {};
        headers = Object.assign(headers, opts.headers, {
          Cookie: parseCookie(cookies)
        });
        opts = Object.assign(opts, {
          headers
        });
      }

      // 处理 url
      url = url
        .split('/')
        .map(item => {
          const [empty, name] = item.split(':');
          if (!empty && data[name]) {
            const value = data[name];
            delete data[name];
            return value;
          }
          return item;
        })
        .join('/');

      if (method === 'get' || method === 'delete') {
        return axiosCache[method](url, {
          ...opts,
          params: data
        });
      }

      return axiosCache[method](url, data, opts);
    };
  }
};

cache.get = cache.request('get');
cache.post = cache.request('post');
cache.put = cache.request('put');
cache.patch = cache.request('patch');
cache.delete = cache.request('delete');

export default cache;
