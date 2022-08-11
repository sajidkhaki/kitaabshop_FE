import React from 'react';
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom';

const SupportDashboard = () => {

    const { user: { name, email, role } } = isAuthenticated()

    const supportLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header"> Support Links </h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/orders">View Orders</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const supportInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">Name : {name}</li>
                    <li className="list-group-item">Email : {email}</li>
                    <li className="list-group-item">Role : {role === 2 ? "Supoort" : ""}</li>
                </ul>
            </div>
        )
    }
    return (
        <Layout title="Support Dashboard" description={`Welcome : ${name.toUpperCase()}`}
            className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {supportLinks()}
                </div>
                <div className="col-9">
                    {supportInfo()}
                </div>
            </div>
        </Layout>
    )
}

export default SupportDashboard
