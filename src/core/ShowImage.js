
import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
    <div className="product-img">
        <img
            src={`http://localhost:8080/api/${url}/photo/${item._id}`}
            alt={item.name}
            className="imgs"
        />
    </div>
);

export default ShowImage;
