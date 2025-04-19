import { useState } from 'react';
import Button from '../../../components/shared/Button';
import AddCategoryModal from '../../../modal/AddCategoryModal';
import { Table, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDeleteCategoryMutation, useGetAllCategoryQuery } from '../../../redux/apiSlices/categorySlice';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

interface Category {
    _id: string;
    name: string;
}

const Category = () => {
    const [createModal, setCreateModal] = useState(false);
    const { data: allCategory, refetch } = useGetAllCategoryQuery(undefined);
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const [deleteCategory] = useDeleteCategoryMutation();

    const dataSource: Category[] = allCategory?.data || [];

    const handleDelete = async (category: Category) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to category this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });
        if (result.isConfirmed) {
            try {
                await deleteCategory(category?._id);
                Swal.fire({
                    title: 'Deleted',
                    text: 'Your category has been deleted',
                    icon: 'success',
                });
                refetch();
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error deleting the category.',
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center' as 'center',
        },
        {
            title: 'Total Business',
            dataIndex: 'totalBusiness',
            key: 'totalBusiness',
            align: 'center' as 'center',
            render: (_: any, record: { totalBusiness?: number }) => <span>{record?.totalBusiness}</span>,
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center' as 'center',
            render: (category: Category) => (
                <Space size="large">
                    <EditOutlined
                        onClick={() => {
                            setEditCategory(category);
                            setCreateModal(true);
                        }}
                        className="text-xl"
                        style={{ color: '#52c41a', cursor: 'pointer' }}
                    />
                    <DeleteOutlined
                        onClick={() => handleDelete(category)}
                        className="text-xl"
                        style={{ color: '#ff4d4f', cursor: 'pointer' }}
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="flex items-center justify-between mb-4 mt-5">
                <div className="text-xl">Category</div>
                <div className="flex justify-end " onClick={() => setCreateModal(true)}>
                    <Button className="text-base w-[170px]">+ Add Category</Button>
                </div>
            </div>
            <Table
                dataSource={dataSource}
                //@ts-ignore
                columns={columns}
                pagination={{ pageSize: 10 }}
                rowKey="_id"
            />

            {/* Add or Edit Category Modal */}
            {createModal && (
                <AddCategoryModal
                    refetch={refetch}
                    isOpen={createModal}
                    editCategory={editCategory}
                    setEditCategory={setEditCategory}
                    onClose={() => {
                        setCreateModal(false);
                        setEditCategory(null);
                    }}
                />
            )}
        </>
    );
};

export default Category;
