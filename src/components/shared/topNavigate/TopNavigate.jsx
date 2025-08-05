import classNames from 'classnames/bind';
import styles from './TopNavigate.module.scss';
import AvatarLogo from '../Avatar/AvatarLogo';
const cx = classNames.bind(styles);

const TopNavigate = () => {
return (
        <div className={cx('topBar')}>
            <div>
                <h4>QUESTBOARD</h4>
            </div>
            <div className={cx('navigationLinks')}>
                <AvatarLogo />
                <h4>HOME</h4>
                <h4>MY TASKS</h4>
                <h4>QUESTS</h4>
                <h4>LEADERBOARD</h4>
            </div>
        </div>
    )
}

export default TopNavigate;