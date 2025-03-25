import { Table } from 'antd';
import { useGetContactsQuery } from '../../../redux/apiSlices/contactSlice';
import { IoEyeOutline } from 'react-icons/io5';
import ContactDetailsModal from '../../../modal/ContactDetailsModal';
import { useState } from 'react';

export default function Contact() {
    const [input, setInput] = useState('');
    const { data } = useGetContactsQuery(input);
    const dataSource = data?.data || [];
    data;

    const [collectData, setCollectData] = useState<{
        name: string;
        email: string;
        phone: string;
        message: string;
    } | null>(null);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center' as 'center',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center' as 'center',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            align: 'center' as 'center',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
            align: 'center' as 'center',

            render: (_: any, render: { message: string }, index: number) => {
                return <span key={index}>{render.message.slice(0, 5)}...</span>;
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'center' as 'center',
            render: (_: any, render: { name: string; email: string; phone: string; message: string }) => (
                <>
                    <p
                        className="flex justify-center items-center cursor-pointer"
                        onClick={() => {
                            setCollectData(render), setIsOpen(true);
                        }}
                    >
                        <IoEyeOutline size={22} />
                    </p>
                </>
            ),
        },
    ];

    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className="mt-10">
            <div className="flex items-center  justify-between mb-4">
                <div className="text-xl">Contact</div>
                <div className="flex justify-end ">
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
    );
}
