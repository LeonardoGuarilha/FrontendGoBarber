import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import FrogotPassword from '../Pages/ForgotPassword';
import ResetPassword from '../Pages/ResetPassword';

import Dashboard from '../Pages/Dashboard';
import Profile from '../Pages/Profile';

// Se tiver isPrivate na rota e o usu;ário não estiver logado, ele será redirecionado para
// a tela de login. O inverso também
const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={FrogotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
