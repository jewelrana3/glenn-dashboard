import { Layout } from 'antd';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useProfileQuery } from '../../redux/apiSlices/profileSlice';
import { imageUrl } from '../../redux/api/baseApi';

const { Header } = Layout;
const HeaderDashboard = () => {
    const { data } = useProfileQuery(undefined);

    const userData = data?.data;
    console.log(userData);

    return (
        <Header className="w-full">
            <div className="flex items-center justify-end w-full -ml-5">
                <div className="flex items-center gap-2">
                    <div>
                        {/*notification icons */}
                        <Link to={'/notification'} className="">
                            <div className="size-10 flex items-center  justify-center">
                                <button className=" py-4 px-1 relative  rounded-full ">
                                    <span className="absolute inset-0 -top-3  -mr-4 ">
                                        <div className="inline-flex items-center px-1 py-0. border-2 border-white rounded-full text-xs font-semibold leading-4  bg-[#FC6057]">
                                            13
                                        </div>
                                    </span>

                                    <IoMdNotificationsOutline size={24} />
                                </button>
                            </div>
                        </Link>
                    </div>
                    <div>
                        {/* profile */}

                        <Link
                            to={'/profile'}
                            style={{
                                height: '42px',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                margin: '10px',
                            }}
                        >
                            <img
                                src={
                                    data.data.profile.startsWith('http')
                                        ? userData?.profile
                                        : `${imageUrl}${userData?.profile}`
                                }
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '50%',
                                    borderColor: '#00369A',
                                    borderWidth: 2,
                                }}
                                alt=""
                            />
                            <h2
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                }}
                            >
                                {data.data.name}
                            </h2>
                        </Link>
                    </div>
                </div>
            </div>
        </Header>
    );
};

export default HeaderDashboard;
