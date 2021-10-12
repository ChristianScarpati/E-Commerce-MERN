import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import Dashboard from './user/UserDashboard'
import PrivateRoute from './auth/PrivateRoute'
import AdminDashboard from './user/AdminDashboard'
import AdminRoute from './auth/AdminRoute'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import Shop from './core/Shop'

const Routes = () => {

    return (
        <BrowserRouter>           
            <Switch>
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/shop" exact component={Shop} />
                <Route  path="/" exact component={Home} />
                <PrivateRoute exact path="/user/dashboard" component={Dashboard} />
                <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
                <AdminRoute exact path="/create/category" component={AddCategory} />
                <AdminRoute exact path="/create/product" component={AddProduct} />


            </Switch>

        </BrowserRouter>
    )
}

export default Routes