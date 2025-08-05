import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';
import { LOGIN_PAGE, REGISTER_PAGE } from './consts';
const cx = classNames.bind(styles);

const LandingComponent = ({ setLoginPage }) => {
    return (
        <>
            <h1>Welcome to QuestBoard!</h1>
            <p><b>It's time to have fun while you get things done!</b>
                <br /><br /> Unlock new skills and defeat monsters by checking off your real life tasks.
                <br /> Earn points, level up, and climb the leaderboard. Keep your goals on track with help from your fellow adventurers.
                <br /> support each other in life and in the game, as you improve together!
            </p>

            <h2>Let's get started!</h2>
            <div className={cx('buttonContainer')}>
                <button onClick={() => setLoginPage(REGISTER_PAGE)}>Register</button>
                <button onClick={() => setLoginPage(LOGIN_PAGE)}>Login</button>
            </div>
        </>
    )
}

export default LandingComponent;