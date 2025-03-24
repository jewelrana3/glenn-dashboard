import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdClose } from 'react-icons/io';
import { useAddBlogMutation, useEditBlogMutation } from '../redux/apiSlices/blogSlice';
import { Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { imageUrl } from '../redux/api/baseApi';
import JoditEditor from 'jodit-react';

//@ts-ignore
const BlogAddEdit = ({ isOpen, onClose, refetch, edit, setEdit, setCreateModal }) => {
    const [form] = Form.useForm();
    const [addBlog] = useAddBlogMutation();
    const [editBlog] = useEditBlogMutation();
    const [selectFile, setSelectFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [content, setContent] = useState('');
    const editor = useRef(null);

    useEffect(() => {
        if (edit?._id) {
            form.setFieldsValue({
                title: edit?.title,
                content: edit?.content,
                image: edit?.image,
            });
            setPreviewUrl(edit?.image?.startsWith('https') ? edit?.image : `${imageUrl}${edit?.image}`);
        }
    }, [edit, form]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        //@ts-ignore
        setSelectFile(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
        form.setFieldsValue({ image: file?.name });
    };

    const handleSubmit = async (values: { title: string; content: string; image: string }) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', values.content);

        if (selectFile) {
            formData.append('image', selectFile);
        }

        if (edit?._id) {
            const res = await editBlog({ _id: edit._id, formData });
            if (res?.data?.success) {
                toast.success('Blog Update Successfully');
                refetch();
                setCreateModal(false);
                setEdit(null);
                form.resetFields();
            }
        } else {
            await addBlog(formData).then((res) => {
                if (res?.data?.success) {
                    toast.success('Blog Add Successfully');
                    refetch();
                    form.resetFields();
                    setCreateModal(false);
                } else {
                    toast.error('Blog Not Add Successfully');
                }
            });
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                //@ts-ignore
                URL.revokeObjectURL(file);
            }
        };
    }, []);

    return (
        <Modal isOpen={isOpen}>
            <div className="p-6 rounded-lg shadow-lg w-[500px]">
                <div className="flex justify-end">
                    <button onClick={onClose}>
                        <IoMdClose size={24} />
                    </button>
                </div>
                <h2 className="text-xl font-semibold mb-4">{edit ? 'Edit Blog Item' : 'Add New Blog'}</h2>
                <Form form={form} layout="vertical" onFinish={handleSubmit} className="space-y-4">
                    <Form.Item label="Title" name="title">
                        <Input
                            type="text"
                            placeholder="Enter your title"
                            className="w-full border border-black h-12 rounded-lg px-4 focus:outline-none"
                            maxLength={50}
                        />
                    </Form.Item>

                    <Form.Item label="Content" name={'content'}>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={{ height: 50, theme: 'light', readonly: false }}
                            onBlur={(newContent) => setContent(newContent)}
                        />
                    </Form.Item>

                    <Form.Item label="Image" name={'image'}>
                        <div>
                            <Input
                                type="file"
                                id="file"
                                name="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />

                            <div
                                className="w-[450px] h-[180px] flex justify-center items-center cursor-pointer border border-gray-300"
                                onClick={() => document.getElementById('file')?.click()}
                            >
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Uploaded" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-gray-500">Upload</span>
                                )}
                            </div>
                            {/* {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>} */}
                        </div>
                    </Form.Item>

                    <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg mt-4">
                        Submit
                    </button>
                </Form>
            </div>
        </Modal>
    );
};

export default BlogAddEdit;
