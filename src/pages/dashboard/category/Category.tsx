import { useState } from 'react';
import CategoryModal from '../../../modal/CategoryModal';
import Button from '../../../components/shared/Button';
import AddCategoryModal from '../../../modal/AddCategoryModal';
import { Table, Space } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import image1 from '../../../../public/category/image1.svg';
import image2 from '../../../../public/category/image2.png';
import { useGetAllCategoryQuery } from '../../../redux/apiSlices/categorySlice';

const dataSource = [
    {
        key: '1',
        image: image1, // Replace with actual image URL
        title: 'Finding Love in the Digital A...',
        date: '2024-10-01',
        city: 'Singapore',
    },
    {
        key: '2',
        image: image2, // Replace with actual image URL
        title: 'Navigating First Dates with ...',
        date: '2024-09-15',
        city: 'Singapore',
    },
];

const columns = [
    {
        title: 'S.No',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: <span className="ml-48">News Title</span>,
        dataIndex: 'title',
        key: 'title',
        render: (text: string, record: { image: string }) => (
            <Space className="ml-20">
                <img width={150} src={record.image} className="rounded-3xl" />
                <span>{text}</span>
            </Space>
        ),
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
    },
    {
        title: 'Publication Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="large">
                <EyeOutlined className="text-xl" style={{ color: '#1890ff', cursor: 'pointer' }} />
                <EditOutlined className="text-xl" style={{ color: '#52c41a', cursor: 'pointer' }} />
                <DeleteOutlined className="text-xl" style={{ color: '#ff4d4f', cursor: 'pointer' }} />
            </Space>
        ),
    },
];

const Category = () => {
    const [categoryDetails, setCategoryDetails] = useState<boolean>(false);
    const [createModal, setCreateModal] = useState(false);
    const { data: allCategory } = useGetAllCategoryQuery(undefined);
    console.log(allCategory);

    return (
        <>
            <div className="flex justify-end my-6 pr-5" onClick={() => setCreateModal(true)}>
                <Button className="text-base">+ Add Category</Button>
            </div>

            <Table dataSource={dataSource} columns={columns} pagination={false} />

            {/* <div className="grid grid-cols-3 gap-5 pr-5">
                {data.map(({ title, revenue, city, amount, men, year, user, man, calender, image }) => (
                    <div key={title} className="rounded-lg border border-gray-200 bg-white shadow-lg mb-6 ">
                        <img
                            src={image} // Replace with your image URL
                            alt="Hospital"
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">{title}</h2>
                                <p className="text-primaryColor font-bold">Revenue: ${revenue}</p>
                            </div>
                            <p className="text-sm text-gray-500">{city} City</p>
                            <div className="flex items-center justify-between space-x-4 mt-5">
                                <div className="flex items-center gap-1">
                                    <img src={user} alt="user" className="w-5 h-5" />
                                    <span className="ml-1">{amount}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <img src={man} alt="men" className="w-5 h-5" />
                                    <span className="ml-1">{men}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <img src={calender} alt="calendar" className="w-5 h-5" />
                                    <span className="ml-1">{year}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}

            {/* Category details modal */}
            {categoryDetails && <CategoryModal isOpen={categoryDetails} onClose={() => setCategoryDetails(false)} />}
            {/* Add category modal */}
            {createModal && <AddCategoryModal isOpen={createModal} onClose={() => setCreateModal(false)} />}
        </>
    );
};

export default Category;
