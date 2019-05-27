let BASEURL = '';
if (process.env.NODE_ENV === 'server') {
  BASEURL = 'https://c.y.qq.com';
}

export {
  BASEURL
};
