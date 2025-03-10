'use client';

import { ConfigProvider, Spin, Table } from 'antd';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useState } from 'react';
import DeleteModal from '../../../modal/DeleteModal';

import eye from '../../../../public/share-icon/eye.svg';
import UserDetailsModal from '../../../modal/UserDetails';

const data = [
    {
        id: '#01',
        userName: 'Omar Yusuf Hassan',
        email: 'omar@gmail.com',
        contactNumber: '+083897453',
        date: '02-10-25',
    },
    {
        id: '#02',
        userName: 'Chen Wei Ling',
        email: 'omar@gmail.com',
        contactNumber: '+083897453',
        date: '02-10-25',
    },
    {
        id: '#03',
        userName: 'Omar Yusuf Hassan',
        email: 'omar@gmail.com',
        contactNumber: '+083897453',
        date: '02-10-25',
    },
    {
        id: '#04',
        userName: 'Chen Wei Ling',
        email: 'omar@gmail.com',
        contactNumber: '+083897453',
        date: '02-10-25',
    },
    {
        id: '#05',
        userName: 'Omar Yusuf Hassan',
        email: 'omar@gmail.com',
        contactNumber: '+083897453',
        date: '02-10-25',
    },
];

export default function RecentUser() {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<boolean>(false);
    console.log(userDetails);
    const [loading] = useState<boolean>(false);

    const tableTheme = {
        components: {
            Table: {
                borderColor: '#E7E7E7',
                fontWeightStrong: 700,
                scrollX,
            },
        },
    };

    return (
        <>
            {/* Table */}
            <div className="rounded-lg mx-auto overflow-x-auto">
                {/* Loader */}
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <Spin size="large" />
                        <p className="ml-3 text-lg">Loading Orders...</p>
                    </div>
                ) : (
                    <ConfigProvider theme={tableTheme}>
                        <Table bordered={false} dataSource={data} pagination={false} className="cursor-pointer">
                            {/* Define columns here */}

                            <Table.Column
                                title={<div className="ml-6">Serial ID</div>}
                                dataIndex="id"
                                key="id"
                                render={(id) => <p className="ml-7">{id}</p>}
                            />
                            <Table.Column title="Visitor Name" dataIndex="userName" key="userName" />
                            <Table.Column
                                title="Email"
                                dataIndex="email"
                                key="email"
                                render={(email) => email || 'N/A'}
                            />

                            <Table.Column
                                title="Contact Number"
                                dataIndex="contactNumber"
                                key="contactNumber"
                                render={(contactNumber) =>
                                    contactNumber ? <span className="">{contactNumber}</span> : 'No'
                                }
                            />

                            <Table.Column
                                title="Visiting Date"
                                dataIndex="date"
                                key="date"
                                render={(date) => (date ? <span className="">{date}</span> : 'No')}
                            />

                            <Table.Column
                                title={<div className="mr-10">Action</div>}
                                dataIndex="action"
                                key="action"
                                align="center"
                                render={() => (
                                    <div className="w-full lg:w-[80%]">
                                        <div className="flex lg:flex-row flex-col items-center justify-center gap-2 lg:gap-5 py-2 rounded-md px-2 lg:px-0">
                                            <span
                                                onClick={() => setUserDetails(true)}
                                                className={`text-nowrap font-semibold  py-1 px-2 rounded-md `}
                                            >
                                                <img src={eye} width={20} height={20} alt="eye" />
                                            </span>
                                            <span
                                                className={`text-nowrap font-semibold  py-1 px-2 rounded-md `}
                                                onClick={() => setIsDeleteModalOpen(true)}
                                            >
                                                <RiDeleteBin5Line size={24} className="text-[#FE3838]" />
                                            </span>
                                        </div>
                                    </div>
                                )}
                            />
                        </Table>
                    </ConfigProvider>
                )}
            </div>

            {/* delete modal */}
            {isDeleteModalOpen && (
                <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
            )}

            {/* user modal */}
            {userDetails && <UserDetailsModal isOpen={userDetails} onClose={() => setUserDetails(false)} />}
        </>
    );
}
