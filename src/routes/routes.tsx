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
import Profile from '../pages/dashboard/profile/Profle';
import SignUp from '../pages/authentication/SignUp';
import Category from '../pages/dashboard/category/Category';
import AboutUs from '../pages/dashboard/AboutUs';
import TermsCondition from '../pages/dashboard/TermsCondition';
import Faq from '../pages/dashboard/faq/Faq';
import Blog from '../pages/dashboard/blog/Blog';
import Contact from '../pages/dashboard/contact/Contact';
import Transaction from '../pages/dashboard/transaction/Transaction';
import PrivateRoute from './PrivateRoute';
import Business from '../pages/dashboard/business/Business';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivateRoute>
                <App />
            </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            { path: '/', element: <Dashboard /> },
            { path: '/category', element: <Category /> },
            { path: '/blog', element: <Blog /> },
            { path: '/business', element: <Business /> },
            { path: '/about-us', element: <AboutUs /> },
            { path: '/terms-condition', element: <TermsCondition /> },
            { path: '/policy', element: <PrivacyPolicy /> },

            { path: '/notification', element: <Notification /> },
            { path: '/profile', element: <Profile /> },
            { path: '/edit-profile', element: <EditProfile /> },
            { path: '/faq', element: <Faq /> },
            { path: '/contact', element: <Contact /> },
            { path: '/transaction', element: <Transaction /> },
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
