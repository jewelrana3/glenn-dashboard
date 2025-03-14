import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { useCreateCategoryMutation, useEditCategoryMutation } from '../redux/apiSlices/categorySlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import { IoMdClose } from 'react-icons/io';

interface FormData {
    name: string;
}

// @ts-ignore
const AddCategoryModal = ({ isOpen, onClose, refetch, editCategory, setEditCategory }) => {
    const [createCategory] = useCreateCategoryMutation();
    const [useEditCategory] = useEditCategoryMutation();
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
                await useEditCategory(data);
                toast.success('Category Added successfully!');
            } else {
                toast.success('Category updated successfully!');
                await createCategory(formData);
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
        <Modal isOpen={isOpen}>
            <div className=" p-6 rounded-lg shadow-lg w-[500px]">
                <div className="flex justify-end">
                    <button onClick={onClose}>
                        <IoMdClose size={24} />
                    </button>
                </div>
                <h2 className="text-xl font-semibold mb-4">{editCategory ? ' Edit Category' : 'Add New Category'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Fuel */}
                    <div className=" gap-4">
                        <div>
                            <label htmlFor="fuel" className="block text-sm font-medium">
                                Title
                            </label>
                            <input
                                type="text"
                                id="fuel"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your fuel category"
                                className="w-full border border-black h-12   rounded-lg px-4 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg mt-4">
                        Submit
                    </button>
                </form>
            </div>
            <ToastContainer position="top-right" />
        </Modal>
    );
};

export default AddCategoryModal;
