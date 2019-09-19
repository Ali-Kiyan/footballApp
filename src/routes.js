import React from 'react';
import Layout from './HoC/Layout';
import { Switch, Route } from 'react-router-dom'
import Home from './components/home';
import SignIn from './components/signin'
// import Dashboard from './components/admin/Dashboard'
const Routes = (props) => {
  return (
    <div>
        <Layout>
          <Switch>
            <Route exact component={SignIn} path="/dashboard"></Route>
            <Route exact component={SignIn} path="/sign_in"></Route>
            <Route exact component={Home} path="/"></Route>
          </Switch>
        </Layout>
    </div>
  )
}

export default Routes;
