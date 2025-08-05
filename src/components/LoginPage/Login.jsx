import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';
const cx = classNames.bind(styles);

import { apiFetchCurrentClient } from '../../api/ClientApi';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentClient } from '../../redux/clients/clientsSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const connectToServer = ({ email, password }) => async () => {
        try {
            const response = await apiFetchCurrentClient(email, password);
            console.log('Login successful:', response);
            dispatch(setCurrentClient(response));
            navigate('/homepage');
        } catch (error) {
            console.error('Client not found!', error);
        }
    };

    return (
            <div className={cx('formContent')}>
                <h1>Login</h1>
                <input
                    type="text"
                    id="EmailAddress"
                    name="email_address"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="Password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <div className={cx('footerButtonContainer')}>
                    <button onClick={connectToServer({email, password})}>Login</button> 
                    <a>Forgot Password</a>
                </div>
            </div>
    )
}

export default Login;