import { useState } from 'react';
import Button from '../../../components/shared/Button';

import { Table } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAllBlogDataQuery } from '../../../redux/apiSlices/blogSlice';
import BlogAdd from '../../../modal/BlogAdd';

// interface Category {
//     _id: string;
//     title: string;
//     name: string;
//     image: string;
// }

export default function Blog() {
    const [createModal, setCreateModal] = useState(false);
    const { data: allBlog, refetch } = useAllBlogDataQuery(undefined);

    const dataSource = allBlog?.data?.blogs || [];
    console.log(dataSource[9].image);

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            render: (_: any, __: any, index: number) => index + 1,
            align: 'center' as 'center',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            align: 'center' as 'center',
            render: (image: string) => {
                return (
                    <div className="flex justify-center items-center">
                        <img
                            src={image ? image : 'https://i.ibb.co.com/ZzZ1DXff/Frame-2147226688.png'}
                            width={70}
                            alt="image"
                        />
                    </div>
                );
            },
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            align: 'center' as 'center',
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            align: 'center' as 'center',
        },
    ];

    return (
        <>
            <div className="flex justify-end my-6 pr-5" onClick={() => setCreateModal(true)}>
                <Button className="text-base">+ Add Blog</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} pagination={false} rowKey="key" />

            <ToastContainer position="top-right" />

            {createModal && <BlogAdd refetch={refetch} isOpen={createModal} onClose={() => setCreateModal(false)} />}
        </>
    );
}
