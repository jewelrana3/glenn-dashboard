import { useState } from 'react';
import { Table } from 'antd';

const data = [
    {
        transactionId: 'TXN12348',
        customer: {
            name: 'Bob Brown',
            email: 'bob.brown@example.com',
            image: 'https://i.ibb.co.com/ZzZ1DXff/Frame-2147226688.png',
        },
        seller: {
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            image: 'https://i.ibb.co.com/xJdQCTG/download.jpg',
        },
        amount: '$350.00',
        transaction: 'Completed',
    },
    {
        transactionId: 'TXN12349',
        customer: {
            name: 'Charlie ',
            email: 'charlie.white@example.com',
            image: 'https://i.ibb.co.com/ZzZ1DXff/Frame-2147226688.png',
        },
        seller: {
            name: 'John',
            email: 'contact@techstore.com',
            image: 'https://i.ibb.co.com/xJdQCTG/download.jpg',
        },
        amount: '$450.00',
        transaction: 'Pending',
    },
    {
        transactionId: 'TXN12350',
        customer: {
            name: 'Samantha Green',
            email: 'samantha@example.com',
            image: 'https://i.ibb.co.com/ZzZ1DXff/Frame-2147226688.png',
        },
        seller: {
            name: 'Gizmo',
            email: 'support@gizmos.com',
            image: 'https://i.ibb.co.com/xJdQCTG/download.jpg',
        },
        amount: '$200.00',
        transaction: 'Failed',
    },
];

export default function Transaction() {
    // const { data } = useGetTransactionQuery(undefined);
    // const dataSource = data?.data || [];
    // console.log(data);

    const columns = [
        {
            title: 'Transaction Id',
            dataIndex: 'transactionId',
            key: 'transaction',
        },
        {
            title: <span className="ml-20">Customer Info</span>,
            dataIndex: 'customer',
            key: 'customer',

            render: (_: any, record: any) => {
                const { name, email, image } = record.customer;
                return (
                    <div className="flex items-center gap-5 ml-20">
                        <span className="text-start">
                            <img src={image} alt="Seller" className="w-8 m-0" />
                        </span>
                        <span className="text-start">
                            <p>{name}</p>
                            <span>{email}</span>
                        </span>
                    </div>
                );
            },
        },
        {
            title: 'Seller Info',
            dataIndex: 'seller',
            key: 'seller',

            render: (_: any, record: any) => {
                const { name, image, email } = record.seller;
                return (
                    <div className="flex items-center gap-5">
                        <span className="text-start">
                            <img src={image} alt="Seller" className="w-8 m-0 rounded-lg" />
                        </span>
                        <span className="text-start">
                            <p>{name}</p>
                            <span>{email}</span>
                        </span>
                    </div>
                );
            },
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Transaction',
            dataIndex: 'transaction',
            key: 'transaction',
        },
    ];

    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <>
            <div className="mt-5">
                <Table dataSource={data} columns={columns} />

                {isOpen && (
                    //@ts-ignore
                    <ContactDetailsModal isOpen={isOpen} onClose={() => setIsOpen(false)} collectData={collectData} />
                )}
            </div>
        </>
    );
}
