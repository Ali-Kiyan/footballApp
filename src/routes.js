import React from 'react';
import Layout from './HoC/Layout';
import { Switch, Route } from 'react-router-dom'
import Home from './components/home';
import SignIn from './components/signin';
import Dashboard from './components/admin/Dashboard';
import PrivateRoute from './components/authRoutes/privateRoutes';

const Routes = (props) => {
  console.log(props)
  return (
    <div>
        <Layout>
          <Switch>
            <PrivateRoute {...props} path="/dashboard" exact component={Dashboard} />
            <Route exact component={SignIn} path="/sign_in"></Route>
            <Route exact component={Home} path="/"></Route>
          </Switch>
        </Layout>
    </div>
  )
}

export default Routes;
