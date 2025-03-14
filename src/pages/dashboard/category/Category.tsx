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
    const [editCategory, setEditCategory] = useState<any>(null);
    const [deleteCategory] = useDeleteCategoryMutation();

    const dataSource = allCategory?.data || [];

    const handleDelete = async (_: Category) => {
        try {
            await deleteCategory(_._id);
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
            render: (text: string, _: any, index: number) => index + 1,
            align: 'center' as 'center',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center' as 'center',
        },

        {
            title: 'Action',
            key: 'action',
            align: 'center' as 'center',
            render: (_: any) => (
                <Space size="large">
                    <EditOutlined
                        onClick={() => {
                            setEditCategory(_);
                            setCreateModal(true);
                        }}
                        className="text-xl"
                        style={{ color: '#52c41a', cursor: 'pointer' }}
                    />
                    <DeleteOutlined
                        onClick={() => handleDelete(_)}
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
            <Table dataSource={dataSource} columns={columns} pagination={false} rowKey="key" />

            <ToastContainer position="top-right" />

            {createModal && (
                <AddCategoryModal
                    refetch={refetch}
                    isOpen={createModal}
                    editCategory={editCategory}
                    setEditCategory={setEditCategory}
                    onClose={() => setCreateModal(false)}
                />
            )}
        </>
    );
};

export default Category;
