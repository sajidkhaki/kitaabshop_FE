import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signup from './Signup'
import Signin from './Signin'
import Home from '../core/Home'

import PrivateRoute from '../auth/PrivateRoute'
import AdminRoute from '../auth/AdminRoute'
import SupportRoute from '../auth/SupportRoute'

import Dashboard from '../user/UserDashboard'
import AdminDashboard from '../user/AdminDashboard'
import SupportDashboard from '../user/SupportDashboard'
import Orders from '../admin/orders'
import AddCategory from '../admin/AddCategory'
import AddProduct from '../admin/AddProduct'
import Product from '../core/Product'
import Cart from '../core/Cart'



const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/product/:productId" exact component={Product} />

                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={AddCategory}/>
                <AdminRoute path="/create/product" exact component={AddProduct} />

                <Route path="/admin/orders" exact component={Orders} />

                <SupportRoute path="/support/dashboard" exact component={SupportDashboard} />
              
            </Switch>
        </BrowserRouter>
    )
}
export default Routes
