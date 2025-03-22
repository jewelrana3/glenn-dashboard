import { useState } from 'react';
import Button from '../../../components/shared/Button';
import { Space, Table } from 'antd';
import { toast } from 'react-toastify';
import { useAllBlogDataQuery, useBlogDeleteMutation } from '../../../redux/apiSlices/blogSlice';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import BlogAddEdit from '../../../modal/BlogAddEdit';
import { imageUrl } from '../../../redux/api/baseApi';
import { IoEyeOutline } from 'react-icons/io5';
import ContentDetails from '../../../modal/ContentDetails';

// Define types for Blog data
interface Blog {
    _id: string;
    title: string;
    content: string;
    image: string;
}

export default function Blog() {
    const [createModal, setCreateModal] = useState(false);
    const { data: allBlog, refetch } = useAllBlogDataQuery(undefined);
    const [blogDelete] = useBlogDeleteMutation();
    const [edit, setEdit] = useState<Blog | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [collectData, setCollectData] = useState<{
        content: string;
    } | null>(null);

    const dataSource: Blog[] = allBlog?.data?.blogs || [];
    dataSource;

    const handleDelete = async (blog: Blog) => {
        try {
            await blogDelete(blog?._id);
            toast.success('Blog item deleted successfully!');
            refetch();
        } catch (err) {
            toast.error('Error deleting blog!');
        }
    };

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
            dataIndex: 'imageUrl',
            key: 'image',
            align: 'center' as 'center',
            render: (_: unknown, item: any) => (
                <div className="flex justify-center items-center">
                    <img src={`${imageUrl}${item?.image}`} width={70} alt="image" />
                </div>
            ),
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
            render: (_: any, record: { content: string }) => {
                return <span>{record?.content.slice(0, 20)}...</span>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center' as 'center',
            render: (blog: Blog) => (
                <Space size="large">
                    <IoEyeOutline
                        className="cursor-pointer"
                        size={22}
                        onClick={() => {
                            setIsOpen(true), setCollectData(blog);
                        }}
                    />
                    <EditOutlined
                        onClick={() => {
                            setEdit(blog);
                            setCreateModal(true);
                        }}
                        className="text-xl"
                        style={{ color: '#52c41a', cursor: 'pointer' }}
                    />
                    <DeleteOutlined
                        onClick={() => handleDelete(blog)}
                        className="text-xl"
                        style={{ color: '#ff4d4f', cursor: 'pointer' }}
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="flex justify-end my-6 pr-5">
                <Button className="text-base" onClick={() => setCreateModal(true)}>
                    + Add Blog
                </Button>
            </div>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 10 }} rowKey="_id" />

            {createModal && (
                <BlogAddEdit
                    refetch={refetch}
                    isOpen={createModal}
                    setCreateModal={setCreateModal}
                    onClose={() => {
                        setCreateModal(false);
                        setEdit(null);
                    }}
                    edit={edit}
                    setEdit={setEdit}
                />
            )}

            {isOpen && collectData && (
                <ContentDetails isOpen={isOpen} onClose={() => setIsOpen(false)} collectData={collectData} />
            )}
        </>
    );
}
