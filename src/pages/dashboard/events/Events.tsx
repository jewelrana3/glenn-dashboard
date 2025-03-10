'use client';

import { ConfigProvider, Spin, Table } from 'antd';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useState } from 'react';
import DeleteModal from '../../../modal/DeleteModal';
import useData from '../../../hooks/useData';

export default function Events() {
    const { data, loading } = useData('/data/events.json');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

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
                        <Table
                            bordered={false}
                            dataSource={data}
                            pagination={{ pageSize: 7 }}
                            className="cursor-pointer"
                        >
                            {/* Define columns here */}

                            <Table.Column
                                title={<div className="ml-6">BookedId</div>}
                                dataIndex="bookedId"
                                key="bookedId"
                                render={(bookedId) => <p className="ml-7">{bookedId}</p>}
                            />
                            <Table.Column title="Booked Date" dataIndex="bookedDate" key="bookedDate" />
                            <Table.Column
                                title={<span className="ml-7">Title</span>}
                                dataIndex="title"
                                key="title"
                                render={(title) => title || 'N/A'}
                            />
                            <Table.Column
                                title="Location"
                                dataIndex="location"
                                key="location"
                                render={(location) => location || 'N/A'}
                            />

                            <Table.Column
                                title={<div className="mr-10">Action</div>}
                                dataIndex="action"
                                key="action"
                                align="center"
                                render={() => (
                                    <div className="w-full lg:w-[80%]">
                                        <div className="flex lg:flex-row flex-col items-center justify-center gap-2 lg:gap-5 py-2 rounded-md   px-2 lg:px-0">
                                            <span
                                                className={`text-nowrap font-semibold  py-1 px-2 rounded-md border border-stoke`}
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
        </>
    );
}
