import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { Upload, UploadFile } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import { IoMdClose } from 'react-icons/io';
import { useAddBlogMutation } from '../redux/apiSlices/blogSlice';
import { UploadChangeParam } from 'antd/es/upload';
import Swal from 'sweetalert2';

interface FormData {
    title: string;
    content: string;
    image: string;
}

// @ts-ignore
const BlogAdd = ({ isOpen, onClose, refetch }) => {
    const [addBlog] = useAddBlogMutation();
    const [imageUrl, setImageUrl] = useState<string>('');

    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: '',
        image: '',
    });

    useEffect(() => {
        if (isOpen) {
            setFormData({
                title: isOpen?.title || '',
                content: isOpen?.content || '',
                image: isOpen?.imageUrl || '',
            });
            setImageUrl(isOpen?.imageUrl?.data || '');
        }
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (info: UploadChangeParam<UploadFile<any>>) => {
        if (info.file.status === 'done') {
            const uploadedUrl = info.file.response?.url || '';
            setImageUrl(uploadedUrl);
            setFormData((prev) => ({
                ...prev,
                image: uploadedUrl,
            }));
        } else if (info.file.status === 'uploading') {
            const reader = new FileReader();
            reader.onloadend = () => {
                const previewUrl = reader.result as string;
                setImageUrl(previewUrl);
                setFormData((prev) => ({
                    ...prev,
                    image: previewUrl,
                }));
            };
            reader.readAsDataURL(info.file.originFileObj!);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await addBlog(formData);
            if (res?.data?.success) {
                Swal.fire({
                    text: res?.data?.message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    refetch();
                    onClose();
                    setFormData({ title: '', content: '', image: '' });
                    setImageUrl('');
                });
            } else {
                Swal.fire({
                    text: res?.data?.message || 'Something went wrong',
                    icon: 'error',
                    showConfirmButton: true,
                });
            }
        } catch (error) {
            console.error('Something went wrong. Please try again.');
            Swal.fire({
                text: 'An error occurred. Please try again.',
                icon: 'error',
                showConfirmButton: true,
            });
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
                <h2 className="text-xl font-semibold mb-4">Add New Blog</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Fuel */}
                    <div className=" gap-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter your title"
                                className="w-full border border-black h-12   rounded-lg px-4 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium mt-4 mb-2">
                                Content
                            </label>
                            <input
                                type="text"
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Enter your content"
                                className="w-full border border-black h-12   rounded-lg px-4 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="Image" className="block text-sm font-medium mt-4 mb-2">
                                Image
                            </label>

                            <Upload showUploadList={false} onChange={handleImageChange} accept="image/*" className="">
                                <div className="w-[450px] h-[100px] flex justify-center items-center  cursor-pointer border border-gray-300">
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="Uploaded" className="w-full h-full object-cover " />
                                    ) : (
                                        <span className="text-gray-500">Upload</span>
                                    )}
                                </div>
                            </Upload>
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

export default BlogAdd;
