import { Select, Table } from 'antd';
import {
    useGetBusinessListQuery,
    useUpdateBusinessMutation,
} from '../../../redux/apiSlices/business-list/businessSlice';
import { useEffect, useState } from 'react';

export default function Business() {
    const [input, setInput] = useState('');
    const [status, setStatus] = useState('');
    const { data } = useGetBusinessListQuery({ input, status });

    const [updateBusiness] = useUpdateBusinessMutation();
    const [businessData, setBusinessData] = useState<any[]>([]);

    const handleStatusChange = async (value: string, record: any) => {
        const data = {
            status: value,
        };

        try {
            await updateBusiness({ _id: record._id, data });
        } catch (err) {
            console.error('Error updating business');
        }
    };

    useEffect(() => {
        if (data?.data?.business) {
            setBusinessData(data.data.business);
        }
    }, [data]);

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: <span className="ml-6">Seller</span>,
            dataIndex: 'seller',
            key: 'seller',
            render: (_: any, { seller }: { seller: { name: string; email: string; profile: string } }) => (
                <div className="flex ml-5">
                    <img src={seller.profile} alt="profile" className="w-10" />
                    <div>
                        <p>{seller.name}</p>
                        <p>{seller.email}</p>
                    </div>
                </div>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Social',
            dataIndex: 'socialMedia',
            key: 'socialMedia',
        },
        {
            title: 'Employess',
            dataIndex: 'employees',
            key: 'employees',
        },
        {
            title: 'Revenue',
            dataIndex: 'revenue',
            key: 'revune',
        },
        {
            title: 'Founded',
            dataIndex: 'founded',
            key: 'founded',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',

            render: (_: any, record: any) => {
                return (
                    <div className="flex items-center gap-5">
                        <Select value={record.status} onChange={(value) => handleStatusChange(value, record)}>
                            <Select.Option value="Approved">Approved</Select.Option>
                            <Select.Option value="Rejected">Rejected</Select.Option>
                        </Select>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="mt-10">
            <div className="flex items-center  justify-between mb-5">
                <div className="text-xl">Business</div>
                <div className="flex justify-end gap-5">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="border border-black outline-none p-1 h-10 rounded-md"
                        placeholder="Search"
                    />

                    <Select defaultValue={'Approved'} onChange={(value) => setStatus(value)} style={{ height: '40px' }}>
                        <Select.Option value="Pending">Pending</Select.Option>
                        <Select.Option value="Approved">Approved</Select.Option>
                        <Select.Option value="Rejected">Rejected</Select.Option>
                    </Select>
                </div>
            </div>

            <Table dataSource={businessData} columns={columns} rowKey="_id" />
        </div>
    );
}
