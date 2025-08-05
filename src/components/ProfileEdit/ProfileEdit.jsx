import AvatarAndName from "../shared/Avatar/AvatarandName";
import ClassCard from "../shared/ClassCard/ClassCard";
import MainContainer from "../shared/MainContainer/MainContainer";
import TopNavigate from "../shared/topNavigate/topNavigate";
import styles from './ProfileEdit.module.scss';
import classNames from "classnames/bind";
import { BARBARIAN, BARD, DRUID, FIGHTER, RANGER, WIZARD } from './consts';
const cx = classNames.bind(styles);

const ProfileEdit = () => {
    return (
        <>
            <TopNavigate />
            <MainContainer>
                <h1>Create Your Champion</h1>
                <AvatarAndName />
                <h2>Choose your class</h2>
                <div className={cx('classCardContainer')}>
                    <ClassCard {...BARBARIAN} />
                    <ClassCard {...BARD} />
                    <ClassCard {...DRUID} />
                    <ClassCard {...FIGHTER}/>
                    <ClassCard {...RANGER} />
                    <ClassCard {...WIZARD} />
                </div>
            </MainContainer>
        </>
    );
    }

export default ProfileEdit;