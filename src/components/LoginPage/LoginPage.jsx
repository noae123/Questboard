import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';
import LandingComponent from './LandingComponent';
import Register from './Register';
import Login from './Login';
import { useState } from 'react';
import { LANDING_PAGE, LOGIN_PAGE, REGISTER_PAGE } from './consts';

const cx = classNames.bind(styles);

const LoginPage = () => {
    const [loginPage, setLoginPage] = useState(LANDING_PAGE);
    const showBackButton = loginPage !== LANDING_PAGE;

    return (
        <div className={cx('cardContainer')}>
            <div className={cx('topBar')}>
                <button onClick={() => setLoginPage(LANDING_PAGE)} className={cx({ 'backButtonHidden': !showBackButton })}>back</button>
            </div>
            <div className={cx('cardContent')}>
                {loginPage === LANDING_PAGE && <LandingComponent setLoginPage={setLoginPage} />}
                {loginPage === REGISTER_PAGE && <Register/>}
                {loginPage === LOGIN_PAGE && <Login/>}
            </div>
        </div>
    )
}

export default LoginPage;