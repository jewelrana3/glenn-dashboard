import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { useCreateCategoryMutation, useEditCategoryMutation } from '../redux/apiSlices/categorySlice';
import { toast } from 'react-toastify';

interface FormData {
    name: string;
}

// @ts-ignore
const AddCategoryModal = ({ isOpen, onClose, refetch, editCategory, setEditCategory }) => {
    const [createCategory] = useCreateCategoryMutation();
    const [editCategoryMutation] = useEditCategoryMutation();
    const [formData, setFormData] = useState<FormData>({
        name: '',
    });

    useEffect(() => {
        if (editCategory) {
            setFormData({
                name: editCategory?.name || '',
            });
        } else {
            setFormData({
                name: '',
            });
        }
    }, [editCategory]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            _id: editCategory?._id,
            ...formData,
        };

        try {
            if (editCategory) {
                await editCategoryMutation(data);
                toast.success('Category updated successfully!');
            } else {
                await createCategory(formData);
                toast.success('Category added successfully!');
            }
            refetch();
            onClose();
            setEditCategory(null);
            setFormData({ name: '' });
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 rounded-lg shadow-lg w-[500px]">
                <h2 className="text-xl font-medium mb-4">{editCategory ? 'Edit Category' : 'Add New Category'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Category Name */}
                    <div className="gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                                Category Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter category name"
                                className="w-full border border-gray-200 h-12 rounded-lg px-4 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg mt-4">
                        Submit
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default AddCategoryModal;
