import Home from '@/components/Home';
import Profile from '@/components/Profile';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Board from '@/components/Board';
import BoardOverview from '@/components/BoardOverview';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/board/',
    name: 'boardOverview',
    component: BoardOverview
  },
  {
    path: '/board/:boardId',
    name: 'Board',
    component: Board
  }
];

export default routes;
