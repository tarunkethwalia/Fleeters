import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Login.css';
class Login extends Component {
    render() {
        return (
            <div className="login">
                <Link to='/placement'>Login</Link>
            </div>
        );
    }
}

export default Login;