import NestedRoute from './NestedRoute';
import StatusRoute from './StatusRoute';
import loadable from '@loadable/component';
import { fetchTopList, fetchTopDetail } from '../store/actions/actions';

const router = [
  {
    path: '/bar',
    component: loadable(() => import('../views/Bar')),
    routes: [
      {
        path: '/bar/child',
        component: loadable(() => import('../views/Child'))
      }
    ]
  },
  {
    path: '/baz',
    component: loadable(() => import('../views/Baz'))
  },
  {
    path: '/foo',
    component: loadable(() => import('../views/Foo'))
  },
  {
    path: '/top-list',
    component: loadable(() => import('../views/TopList')),
    exact: true,
    loadData(store, params) {
      return store.dispatch(fetchTopList(params));
    }
  },
  {
    path: '/top-list/:id',
    component: loadable(() => import('../views/TopDetail')),
    loadData(store, params) {
      return store.dispatch(fetchTopDetail(params));
    }
  }
];

export default router;

export {
  router,
  NestedRoute,
  StatusRoute
};
