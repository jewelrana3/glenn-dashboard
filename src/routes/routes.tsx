import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/authentication/Login';
import ErrorPage from '../pages/error/ErrorPage';
import Notification from '../pages/dashboard/Notification';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import NewPassword from '../pages/authentication/NewPassword';
import Dashboard from '../pages/dashboard/dasboard/Dashboard';
import PrivacyPolicy from '../pages/dashboard/PrivacyPolicy';
import EditProfile from '../pages/dashboard/profile/EditProfile';
import ChangePassword from '../pages/dashboard/profile/ChangePassword';
import Agency from '../pages/dashboard/agency/Agency';
import Profile from '../pages/dashboard/profile/Profle';
import SignUp from '../pages/authentication/SignUp';
import Category from '../pages/dashboard/category/Category';
import AboutUs from '../pages/dashboard/AboutUs';
import TermsCondition from '../pages/dashboard/TermsCondition';
import Visitor from '../pages/dashboard/users/Users';
import Faq from '../pages/dashboard/faq/Faq';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: '/', element: <Dashboard /> },
            { path: '/visitor', element: <Visitor /> },
            { path: '/agency', element: <Agency /> },
            { path: '/category', element: <Category /> },
            { path: '/about-us', element: <AboutUs /> },
            { path: '/terms-condition', element: <TermsCondition /> },
            { path: '/policy', element: <PrivacyPolicy /> },

            { path: '/notification', element: <Notification /> },
            { path: '/profile', element: <Profile /> },
            { path: '/edit-profile', element: <EditProfile /> },
            { path: '/faq', element: <Faq /> },
            { path: '/change-password', element: <ChangePassword /> },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/new-password', element: <NewPassword /> },
]);

export default router;
