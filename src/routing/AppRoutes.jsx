import { Route, Routes } from 'react-router-dom';
import LoginPage from '../components/LoginPage/LoginPage';
import HomePage from '../components/Homepage/HomePage';
import ProfileEdit from '../components/ProfileEdit/ProfileEdit';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
    </Routes>
);

export default AppRoutes;