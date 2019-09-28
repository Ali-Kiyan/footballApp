import React from 'react';
import Layout from './HoC/Layout';
import { Switch, Route } from 'react-router-dom'
import Home from './components/home';
import SignIn from './components/signin';
import Dashboard from './components/admin/Dashboard';
import PrivateRoute from './components/authRoutes/privateRoutes';
import PublicRoute from './components/authRoutes/publicRoutes';

const Routes = (props) => {
  console.log(props)
  return (
    <div>
        <Layout>
          <Switch>
            <PrivateRoute {...props} path="/dashboard" exact component={Dashboard} />
            <PublicRoute {...props} restricted={true} path="/sign_in" exact component={SignIn} />
            <PublicRoute {...props} restricted={false} path="/" exact component={Home} />
          </Switch>
        </Layout>
    </div>
  )
}

export default Routes;
