import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import category from '../../../public/sidebar-icon/category.svg';
import about from '../../../public/sidebar-icon/about.svg';
import privacy from '../../../public/sidebar-icon/privacy.svg';
import terms from '../../../public/sidebar-icon/terms.svg';
import dashboard from '../../../public/dashboard/dashboard.svg';
import { CiLock, CiSettings } from 'react-icons/ci';
import { MdKeyboardArrowUp, MdLogout, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { RiContactsBook3Line } from 'react-icons/ri';
import { BsBlockquoteLeft } from 'react-icons/bs';
import { FcMoneyTransfer } from 'react-icons/fc';
import logo from '../../../public/logo.svg';
import { PiChartScatterThin } from 'react-icons/pi';
import './Sideber.css';

const menuItems = [
    { label: 'Dashboard', path: '/', icon: <img src={dashboard} width={22} height={22} alt="dashboard" /> },
    { label: 'Category', path: '/category', icon: <img src={category} alt="category" width={22} height={22} /> },
    { label: 'Business', path: '/business', icon: <PiChartScatterThin size={24} /> },
    { label: 'Blog', path: '/blog', icon: <BsBlockquoteLeft size={24} /> },
    {
        label: 'FAQ',
        path: '/faq',
        icon: <img src={terms} width={22} height={22} alt="faq" />,
    },
    {
        label: 'Contact',
        path: '/contact',
        icon: <RiContactsBook3Line size={22} />,
    },
    {
        label: 'Transaction',
        path: '/transaction',
        icon: <FcMoneyTransfer size={22} />,
    },
];

const settings = [
    {
        label: 'Setting',
        icon: <IoSettingsOutline size={24} />,
        path: '/profile',
        children: [
            { label: 'Profile', path: '/profile', icon: <img src={about} width={22} height={22} alt="profile" /> },
            { label: 'Change Password', path: '/change-password', icon: <CiLock size={24} /> },
            { label: 'About Us', path: '/about-us', icon: <img src={about} width={22} height={22} alt="about" /> },

            {
                label: 'Privacy Policy',
                path: '/policy',
                icon: <img src={privacy} width={22} height={22} alt="policy" />,
            },
            {
                label: 'Terms And Condition',
                path: '/terms-condition',
                icon: <img src={terms} width={22} height={22} alt="terms" />,
            },
        ],
    },
];

const Sidebar = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState('');
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const pathname = useLocation();
    const currentPath = pathname.pathname;

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };
    return (
        <div className="h-screen" style={{ backgroundColor: '', fontFamily: 'Poppins' }}>
            <div className="flex items-center justify-center p-3 cursor-pointer" onClick={() => setActiveMenu('/')}>
                <img src={logo} alt="Logo" className="w-32" />
            </div>

            <div style={{ backgroundColor: '', color: '#929292' }} className="mt-10">
                {menuItems.map((item) => {
                    return (
                        <div
                            onClick={() => setActiveMenu(item.path)}
                            key={item.path}
                            className={`navigation-item ${
                                activeMenu === item.path || currentPath === item.path ? 'active ' : ''
                            }`}
                        >
                            <b></b>
                            <b></b>
                            <Link className="flex items-center gap-4 p-6 py-2" to={item.path}>
                                <span>{item.icon}</span>
                                {item.label}
                                {item.label === 'Post List' && <div className="notification-bubble -mt-4 -ml-1">1</div>}
                            </Link>
                        </div>
                    );
                })}

                <div onClick={() => setIsSettingOpen(!isSettingOpen)} className="cursor-pointer">
                    <div className="flex items-center ml-6 my-2 ">
                        <div className="flex gap-3 mt-2">
                            <span>
                                <CiSettings size={26} />
                            </span>
                            <span> Setting</span>
                        </div>
                        <div className="ml-28">
                            {isSettingOpen ? <MdKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                        </div>
                    </div>
                </div>

                {/* dublicate */}
                <div className={isSettingOpen ? 'block ' : 'hidden'}>
                    {settings.map((setting) => (
                        <div key={setting.path} className="ml-4">
                            {setting.children.map((child) => (
                                <div
                                    key={`${setting.path}-${child.path}`}
                                    onClick={() => setActiveMenu(child.path)}
                                    className={activeMenu === child.path || currentPath === child.path ? '' : 'my-1'}
                                >
                                    <Link to={child.path} className="flex items-center gap-4 p-6 py-2">
                                        <span>{child.icon}</span>
                                        {child.label}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div
                    className=" flex items-center mt-20 gap-3 text-[#929292]  text-[18px]  py-2 rounded-xl cursor-pointer ml-6"
                    onClick={handleLogout}
                >
                    <span>
                        <MdLogout className="font-bold" size={23} />
                    </span>
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
