import { Avatar } from "@mui/material";
import styles from './AvatarAndName.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const AvatarLogo = () => {
    return(
        <Avatar className={cx('customAvatar')}>NE</Avatar>
    )
}

export default AvatarLogo;