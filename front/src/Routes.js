import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import Dashboard from './user/UserDashboard'
import PrivateRoute from './auth/PrivateRoute'
import AdminDashboard from './user/AdminDashboard'
import AdminRoute from './auth/AdminRoute'


const Routes = () => {

    return (
        <BrowserRouter>           
            <Switch>
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route  path="/" exact component={Home} />
                <PrivateRoute exact path="/user/dashboard" component={Dashboard} />
                <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />

            </Switch>

        </BrowserRouter>
    )
}

export default Routes