import styles from './ClassCard.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const ClassCard = ({cardName, className, description, image, icon}) => {
    return(
        <div className={cx('card')}>
            <div className={cx('content')}>
                <div className={cx('back')}>
                    <div className={cx('back-content')}>
                        <img className={cx('imgIcon')} src={icon}/>
                        <strong>{cardName}</strong>
                    </div>
                </div>

                <div className={cx('front')}>
                    <img className={cx('img')} src={image}/>
                    <div className={cx('front-content')}>
                        <small className={cx('badge')}>{className}</small>
                        <div className={cx('description')}>
                            <div className={cx('title')}>
                                    <p>{description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassCard;