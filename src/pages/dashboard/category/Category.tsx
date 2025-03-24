import { useState } from 'react';
import Button from '../../../components/shared/Button';
import AddCategoryModal from '../../../modal/AddCategoryModal';
import { Table, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDeleteCategoryMutation, useGetAllCategoryQuery } from '../../../redux/apiSlices/categorySlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        try {
            await deleteCategory(category._id);
            toast.success('Category deleted successfully!');
            refetch();
        } catch (error) {
            console.error(error);
            toast.error('Error deleting category!');
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
            render: (_: any, record: Category & { totalBusiness?: number }) => (
                <span>{record?.totalBusiness || 33}</span>
            ),
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
            <div className="flex justify-end my-6 pr-5" onClick={() => setCreateModal(true)}>
                <Button className="text-base">+ Add Category</Button>
            </div>

            {/* Table displaying categories */}
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 10 }} // Add pagination for better UX
                rowKey="_id" // Using _id as the row key
            />

            <ToastContainer position="top-right" />

            {/* Add or Edit Category Modal */}
            {createModal && (
                <AddCategoryModal
                    refetch={refetch}
                    isOpen={createModal}
                    editCategory={editCategory}
                    setEditCategory={setEditCategory}
                    onClose={() => {
                        setCreateModal(false);
                        setEditCategory(null); // Reset the edit category on modal close
                    }}
                />
            )}
        </>
    );
};

export default Category;
