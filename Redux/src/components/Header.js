import React from 'react';
import { useHistory } from 'react-router-dom';

const Header = () => {

    const history = useHistory();

    return (
        <div className="header-box">
            <h2 onClick={() => history.push('/')} className="title">CRUD - React, Redux, REST API & Axios</h2>
            <button onClick={() => history.push('/new-product')} className="header-button">Add a Product</button>
        </div>
    );
};

export default Header;