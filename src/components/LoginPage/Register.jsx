import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');

    const register = () => async () => {
        //todo: implement registration logic    
    };

    return (
        <>
            <div className={cx('formContent')}>
                <h1>Register</h1>
                <input type="text" id="Username" name="username" placeholder="Username" value={username}
                    onChange={e => setUsername(e.target.value)}></input>
                <input type="text" id="EmailAddress" name="email_address" placeholder="Email address" value={email}
                    onChange={e => setEmail(e.target.value)}></input>
                <input type="password" id="Password" name="password" placeholder="Password" value={password}
                    onChange={e => setPassword(e.target.value)}></input>
                <input type="password" id="ConfirmPassword" name="confirm_password" placeholder="Confirm Password" value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}></input>

                <div className={cx('footerButtonContainer')}>
                    <button onClick={register()}>Register</button> 
                    <a>Forgot Password</a>
                </div>
            </div>
        </>
    )
}

export default Register;