import { useState } from 'react';
import { Table } from 'antd';
import { useGetTransactionQuery } from '../../../redux/apiSlices/transactionSlice';

// const data = [
//     {
//         transactionId: 'TXN12348',
//         customer: {
//             name: 'Bob Brown',
//             email: 'bob.brown@example.com',
//             image: 'https://i.ibb.co.com/ZzZ1DXff/Frame-2147226688.png',
//         },
//         seller: {
//             name: 'Alice Johnson',
//             email: 'alice.johnson@example.com',
//             image: 'https://i.ibb.co.com/xJdQCTG/download.jpg',
//         },
//         amount: '$350.00',
//         transaction: 'Completed',
//     },
//     {
//         transactionId: 'TXN12349',
//         customer: {
//             name: 'Charlie ',
//             email: 'charlie.white@example.com',
//             image: 'https://i.ibb.co.com/ZzZ1DXff/Frame-2147226688.png',
//         },
//         seller: {
//             name: 'John',
//             email: 'contact@techstore.com',
//             image: 'https://i.ibb.co.com/xJdQCTG/download.jpg',
//         },
//         amount: '$450.00',
//         transaction: 'Pending',
//     },
//     {
//         transactionId: 'TXN12350',
//         customer: {
//             name: 'Samantha Green',
//             email: 'samantha@example.com',
//             image: 'https://i.ibb.co.com/ZzZ1DXff/Frame-2147226688.png',
//         },
//         seller: {
//             name: 'Gizmo',
//             email: 'support@gizmos.com',
//             image: 'https://i.ibb.co.com/xJdQCTG/download.jpg',
//         },
//         amount: '$200.00',
//         transaction: 'Failed',
//     },
// ];

export default function Transaction() {
    const [input, setInput] = useState('');
    const { data } = useGetTransactionQuery(input);
    const dataSource = data?.data || [];
    console.log(dataSource);

    const columns = [
        {
            title: 'Transaction Id',
            dataIndex: 'txid',
            key: 'txid',
            align: 'center' as 'center',
        },
        {
            title: <span className="ml-10">Customer Info</span>,
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: <span className="ml-10">Seller Info</span>,
            dataIndex: 'seller',
            key: 'seller',

            // render: (_: any, record: any) => {
            //     const { name, image, email } = record.seller;
            //     return (
            //         <div className="flex items-center gap-5">
            //             <span className="text-start">
            //                 <img src={image} alt="Seller" className="w-8 m-0 rounded-lg" />
            //             </span>
            //             <span className="text-start">
            //                 <p>{name}</p>
            //                 <span>{email}</span>
            //             </span>
            //         </div>
            //     );
            // },
        },
        {
            title: 'Amount',
            dataIndex: 'price',
            key: 'price',
            align: 'center' as 'center',
        },
        {
            title: 'Proposal',
            dataIndex: 'proposal',
            key: 'proposal',
            align: 'center' as 'center',
        },
    ];

    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <>
            <div className="mt-5">
                <div className="flex items-center  justify-between">
                    <div className="text-xl">Transaction</div>
                    <div className="flex justify-end mb-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="border border-black outline-none p-1 h-12 rounded-md"
                            placeholder="Search"
                        />
                    </div>
                </div>
                <Table dataSource={dataSource} columns={columns} />

                {isOpen && (
                    //@ts-ignore
                    <ContactDetailsModal isOpen={isOpen} onClose={() => setIsOpen(false)} collectData={collectData} />
                )}
            </div>
        </>
    );
}
