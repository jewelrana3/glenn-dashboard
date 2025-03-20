import { useState } from 'react';

import { useGetTransactionQuery } from '../../../redux/apiSlices/transactionSlice';
import { Table } from 'antd';
import { FaPlus } from 'react-icons/fa';

export default function Transaction() {
    const { data } = useGetTransactionQuery(undefined);
    const dataSource = data?.data || [];
    console.log(data);

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            render: (_: any, __: any, index: number) => index + 1,
            align: 'center' as 'center',
        },
        {
            title: 'Transaction',
            dataIndex: 'bussness',
            key: 'bussness',
            align: 'center' as 'center',
        },
    ];

    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <>
            <div className="flex justify-end mt-10">
                <div
                    className="flex items-center gap-3 bg-[#FFAB3E] w-32 p-2 rounded-md cursor-pointer"
                    // onClick={() => setOpenModal(true)}
                >
                    <p>
                        <FaPlus className="" />
                    </p>
                    <button className="">Add FAQ</button>
                </div>
            </div>

            <div className="mt-5">
                <Table dataSource={dataSource} columns={columns} />

                {isOpen && (
                    //@ts-ignore
                    <ContactDetailsModal isOpen={isOpen} onClose={() => setIsOpen(false)} collectData={collectData} />
                )}
            </div>
        </>
    );
}
