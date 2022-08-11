import React, { useState, useEffect } from 'react';
import Layout from './Layout'
import { getProducts } from './ApiCore';
import Card from './Card'

const Home = () => {
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);


    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
    }, []);

    return (
        <Layout title="Home Page" description="Mini Book shop "
            className="container-fluid"
        >
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    )

}




export default Home;
