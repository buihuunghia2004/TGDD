import Detail from '~/pages/Detail';
import Home from '~/pages/Home';

const publicRoutes = [
  { path: '/', component: Home},
  { path: '/detail', component: Detail},
];

const privateRoutes = [
];

export { publicRoutes, privateRoutes };
