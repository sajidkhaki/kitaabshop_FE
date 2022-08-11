import React, { useState } from 'react';
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom';
import { addAdminCategory } from '../admin/apiAdmin'

const AddCategory = () => {

    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // destruct user and token from local storage

    const { user, token } = isAuthenticated()


    const handleChange = e => {
        setError('')
        setSuccess('')
        setName(e.target.value)
    }

    const clickSubmit = event => {
        event.preventDefault()
        setError('')
        setSuccess(false)
        // make request to API
        addAdminCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(true)
                }
                else {
                    setError('')
                    setSuccess(true)
                    setName("")
                }
            })
    }

    const showSuccess = () => {
        if (success) {
            return (<h3 className="text-success">category created</h3>
            )
        }
    }

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category {name} should be unique</h3>
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Dashboard</Link>
        </div>
    )


    const newCategoryForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Category Name</label>
                <input onChange={handleChange} type="name" className="form-control"
                    value={name} autoFocus required />
            </div>
            <button className="btn btn-outline-primary" onClick={clickSubmit} >
                Create Category
            </button>
        </form>
    )

    return (
        <Layout title="Add new category" description={`Welcome : ${user.name}`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {goBack()}
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory
