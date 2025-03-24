import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import category from '../../../public/sidebar-icon/category.svg';
import about from '../../../public/sidebar-icon/about.svg';
import privacy from '../../../public/sidebar-icon/privacy.svg';
import terms from '../../../public/sidebar-icon/terms.svg';
import dashboard from '../../../public/dashboard/dashboard.svg';
import { CiLock, CiLogout } from 'react-icons/ci';
import './SiderbarDublicate.css';
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { RiContactsBook3Line } from 'react-icons/ri';
import { BsBlockquoteLeft } from 'react-icons/bs';
import { FcMoneyTransfer } from 'react-icons/fc';
import logo from '../../../public/logo.svg';
import { PiChartScatterThin } from 'react-icons/pi';

const menuItems = [
    { label: 'Dashboard', path: '/', icon: <img src={dashboard} width={22} height={22} alt="dashboard" /> },
    // { label: 'Visitor', path: '/visitor', icon: <img src={visitor} alt="visitor" width={28} height={28} /> },

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

export default function SiderbarDublicate() {
    const location = useLocation();
    const [settingIcon, setSettingIcon] = useState<boolean>(false);
    const [isSetting, setIsSetting] = useState<boolean>(false);
    const navigate = useNavigate();

    const getMenuItemClass = (path: string) => {
        return location.pathname === path && 'active';
    };

    const handleSetting = () => {
        setIsSetting(!isSetting);
        setSettingIcon(!settingIcon);
    };

    const handleLogout = () => {
        localStorage.removeItem('accressToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    };

    return (
        <div className="sidebar">
            <Link to="/">
                <div className="flex justify-center items-center my-8">
                    <img src={logo} alt="pic" className="h-10 xl:h-12" />
                </div>
            </Link>
            <div className="navigation ">
                <ul className="menu ml-6">
                    {menuItems.map((item) => (
                        <li key={item.path} className={`menu-item ${getMenuItemClass(item.path)}`}>
                            <b></b>
                            <b></b>
                            <Link to={item.path} className="">
                                <div className="mt-1">
                                    <div className="flex items-center ">
                                        <span className="icon ">{item.icon}</span>
                                        <span className=" text-[#333333] hidden md:block text-base">{item.label}</span>
                                    </div>
                                </div>
                            </Link>
                            <br />
                        </li>
                    ))}

                    {/* setting pages */}
                    <li onClick={handleSetting} className={`menu-item-setting  cursor-pointer`}>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-3">
                                <span className="icon flex items-center">{<IoSettingsOutline size={24} />}</span>
                                <span className=" text-[#333]">Settings</span>
                            </div>
                            <p className="">{settingIcon ? <MdKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}</p>
                        </div>
                        <br />
                        {isSetting && (
                            <ul className="submenu ml-5 mb-4">
                                {settings?.[0].children.map(
                                    (item: { label: string; path: string; icon: JSX.Element }) => {
                                        return (
                                            <li
                                                key={item.path}
                                                className={`submenu-item  px-4 mb-2  ${getMenuItemClass(item.path)}`}
                                            >
                                                <Link
                                                    to={item.path}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="flex items-center gap-3"
                                                >
                                                    <span className="icon">{item.icon}</span>
                                                    <span className="title">{item.label}</span>
                                                </Link>
                                            </li>
                                        );
                                    },
                                )}
                            </ul>
                        )}
                    </li>

                    <li className={`cursor-pointer mt-[5%] flex items-center justify-center`}>
                        <div
                            className="flex items-center justify-center w-[80%] gap-3 border border-gray-400 py-2 px-1 rounded-xl"
                            onClick={handleLogout}
                        >
                            <CiLogout className="font-bold " size={23} />
                            <span className=" text-[#333]">Logout</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
