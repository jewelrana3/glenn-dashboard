import { useState } from 'react';
import Button from '../../../components/shared/Button';
import { Space, Table } from 'antd';
import { useAllBlogDataQuery, useBlogDeleteMutation } from '../../../redux/apiSlices/blogSlice';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import BlogAddEdit from '../../../modal/BlogAddEdit';
import { imageUrl } from '../../../redux/api/baseApi';
import { IoEyeOutline } from 'react-icons/io5';
import ContentDetails from '../../../modal/ContentDetails';
import Swal from 'sweetalert2';

// Define types for Blog data
interface Blog {
    _id: string;
    title: string;
    content: string;
    image: string;
}

export default function Blog() {
    const [input, setInput] = useState('');
    const [createModal, setCreateModal] = useState(false);
    const { data: allBlog, refetch } = useAllBlogDataQuery(input);
    const [blogDelete] = useBlogDeleteMutation();
    const [edit, setEdit] = useState<Blog | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [collectData, setCollectData] = useState<{
        content: string;
    } | null>(null);

    const dataSource: Blog[] = allBlog?.data?.blogs || [];
    dataSource;

    const handleDelete = async (blog: Blog) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to blog this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });
        if (result.isConfirmed) {
            try {
                await blogDelete(blog?._id);
                Swal.fire({
                    title: 'Deleted',
                    text: 'Your blog has been deleted',
                    icon: 'success',
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error deleting the blog.',
                    icon: 'error',
                });
            }
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
            render: (_: any, record: { title: string }) => {
                return <span>{record?.title}</span>;
            },
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',

            render: (_: any, record: { content: string }) => (
                <div className="flex items-center">
                    <div dangerouslySetInnerHTML={{ __html: record?.content.slice(0, 20) }} /> ..
                </div>
            ),
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
            <div className="flex items-center  justify-between mb-4 mt-10">
                <div className="text-xl">Blog</div>
                <div className="flex justify-end items-center gap-6">
                    <div className="flex justify-end">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="border border-black outline-none p-1 h-12 rounded-md"
                            placeholder="Search"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button className="text-base w-[140px]" onClick={() => setCreateModal(true)}>
                            + Add Blog
                        </Button>
                    </div>
                </div>
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
