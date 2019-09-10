import React from 'react';
import Layout from './HoC/Layout';
import { Switch, Route } from 'react-router-dom'
import Home from './components/home';
import SignIn from './components/signin'
const Routes = (props) => {
  return (
    <div>
        <Layout>
          <Switch>
            <Route exact component={SignIn} path="/sign_in"></Route>
            <Route exact component={Home} path="/"></Route>
          </Switch>
        </Layout>
    </div>
  )
}

export default Routes;
