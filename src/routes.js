import React from 'react';
import Layout from './HoC/Layout';
import { Switch, Route } from 'react-router-dom'
import Home from './components/home';
import SignIn from './components/signin';
import Dashboard from './components/admin/Dashboard';
import PrivateRoute from './components/authRoutes/privateRoutes';
import PublicRoute from './components/authRoutes/publicRoutes';
import AdminMatches from './components/admin/matches';
import AddEditMatch from './components/admin/matches/addEditMatch';
import AdminPlayers from './components/admin/players';
import AddEditPlayers from './components/admin/players/addEditPlayers';
import Team from './components/team';


const Routes = (props) => {
  console.log(props)
  return (
    <div>
        <Layout>
          <Switch>
            <PrivateRoute {...props} path="/admin_players/add_players" exact component={AddEditPlayers} />
            <PrivateRoute {...props} path="/admin_players/add_players/:id" exact component={AddEditPlayers} />
            <PrivateRoute {...props} path="/admin_players" exact component={AdminPlayers} />
            <PrivateRoute {...props} path="/admin_matches/edit_match" exact component={AddEditMatch} />
            <PrivateRoute {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMatch} />
            <PrivateRoute {...props} path="/admin_matches" exact component={AdminMatches} />
            <PrivateRoute {...props} path="/dashboard" exact component={Dashboard} />
            <PublicRoute {...props} restricted={true} path="/sign_in" exact component={SignIn} />
            <PublicRoute {...props} restricted={false} path="/team" exact component={Team} />
            <PublicRoute {...props} restricted={false} path="/" exact component={Home} />
          </Switch>
        </Layout>
    </div>
  )
}

export default Routes;
