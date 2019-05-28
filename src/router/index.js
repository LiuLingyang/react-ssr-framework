import NestedRoute from './NestedRoute';
import StatusRoute from './StatusRoute';
import loadable from '@loadable/component';
import { fatchTopList, fetchTopDetail } from '../store/actions/actions';

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
    component: loadable(() => import('../components/TopList')),
    exact: true,
    loadData(store) {
      return store.dispatch(fatchTopList());
    }
  },
  {
    path: '/top-list/:id',
    component: loadable(() => import('../components/TopDetail')),
    loadData(store, params) {
      return store.dispatch(fetchTopDetail(params.id));
    }
  }
];

export default router;

export {
  router,
  NestedRoute,
  StatusRoute
};
