import classNames from 'classnames/bind';
import styles from './MainContainer.module.scss';
const cx = classNames.bind(styles);


const MainContainer = ({ children }) => {
    return (
        <div className={cx('mainContainer')}>
            {children}
        </div>
    );
}

export default MainContainer;