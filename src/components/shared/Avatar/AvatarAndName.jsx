import { Avatar } from "@mui/material";
import styles from './AvatarAndName.module.scss';
import classNames from "classnames/bind";
import AvatarLogo from "./AvatarLogo";
const cx = classNames.bind(styles);

const AvatarAndName = () => {
    return(
        <div className={cx('container')}>
            <AvatarLogo />
            <h2>Name</h2>
        </div>
    )
}

export default AvatarAndName;