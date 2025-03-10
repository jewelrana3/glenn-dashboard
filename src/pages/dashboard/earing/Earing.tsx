'use client';

import { ConfigProvider, Spin, Table } from 'antd';
import { useState } from 'react';
import useData from '../../../hooks/useData';

import { MdOutlineRemoveRedEye } from 'react-icons/md';
import EaringModalDetails from '../../../modal/EaringModalDetails';
import EventStates from '../dasboard/EventStates';

export default function Earing() {
    const { data, loading } = useData('/data/earing.json');
    const [isEaringModalDetails, setIsEaringModalDetails] = useState<boolean>(false);

    const tableTheme = {
        components: {
            Table: {
                borderColor: '#E7E7E7',
                // fontWeightStrong: 500,
                scrollX,
            },
        },
    };

    return (
        <>
            <EventStates />
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
                            pagination={{ pageSize: 6 }}
                            className="cursor-pointer"
                        >
                            {/* Define columns here */}

                            <Table.Column
                                title={<div className="ml-6">Serial</div>}
                                dataIndex="id"
                                key="id"
                                render={(id) => <p className="ml-7">{id}</p>}
                            />
                            <Table.Column title="Order Id" dataIndex="orderId" key="orderId" />
                            <Table.Column
                                title="Trax Id"
                                dataIndex="traxId"
                                key="traxId"
                                render={(traxId) => traxId || 'N/A'}
                            />

                            <Table.Column
                                title="Email"
                                dataIndex="email"
                                key="email"
                                render={(email) => (email ? <span className="">{email}</span> : 'No')}
                            />

                            <Table.Column
                                title="Date"
                                dataIndex="date"
                                key="date"
                                render={(date) => (date ? <span className="">{date}</span> : 'No')}
                            />
                            <Table.Column
                                title="Amount"
                                dataIndex="amount"
                                key="amount"
                                render={(amount) => (amount ? <span className="">${amount}</span> : 'No')}
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
                                                className={`text-nowrap font-semibold  py-1 px-2 rounded-md `}
                                                onClick={() => setIsEaringModalDetails(true)}
                                            >
                                                <MdOutlineRemoveRedEye size={24} />
                                            </span>
                                        </div>
                                    </div>
                                )}
                            />
                        </Table>
                    </ConfigProvider>
                )}
            </div>

            {/* earing  modal */}
            {isEaringModalDetails && (
                <EaringModalDetails isOpen={isEaringModalDetails} onClose={() => setIsEaringModalDetails(false)} />
            )}
        </>
    );
}
