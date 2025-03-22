import { useState, useEffect } from 'react';
import { Form, Input, Avatar } from 'antd';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { BiUpload } from 'react-icons/bi';
import Button from '../../../components/shared/Button';
import { useProfileQuery, useUpdateProfileMutation } from '../../../redux/apiSlices/profileSlice';
import { toast } from 'react-toastify';
import { imageUrl } from '../../../redux/api/baseApi';

interface formValues {
    name: string;
    email: string;
    profile: string;
}

export default function EditProfile() {
    const { data, refetch } = useProfileQuery(undefined);
    const navigate = useNavigate();
    const [updateProfile] = useUpdateProfileMutation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    selectedImage;

    const [form] = Form.useForm();

    useEffect(() => {
        if (data?.data) {
            form.setFieldsValue({
                name: data.data.name,
                email: data.data.email,
            });
            setSelectedImage(data?.data?.profile || null);
        }
    }, [data, form]);

    const onFinish = async (values: formValues) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);

        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        values;

        try {
            const res = await updateProfile(formData);
            if (res?.data?.success) {
                toast.success('Profile updated successfully');
                form.resetFields();
                refetch();
                navigate(-1);
            } else {
                toast.error('Profile update failed');
            }
        } catch (err) {
            toast.error('Profile update failed');
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        //@ts-ignore
        setSelectedImage(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
        form.setFieldsValue({
            profile: file?.name,
        });
    };

    return (
        <div className="overflow-hidden">
            <div className="w-[1035px] mx-auto">
                <div className="flex items-center gap-4 font-semibold text-[20px]" onClick={() => navigate(-1)}>
                    <button className="text-xl">
                        <MdOutlineArrowBackIosNew />
                    </button>
                    <button>Edit Profile</button>
                </div>
                <div className="flex justify-between space-x-6 mt-12">
                    <div className="flex gap-4">
                        <div>
                            <Avatar
                                size={100}
                                src={
                                    data?.data?.profile?.startsWith('http')
                                        ? data?.data?.profile
                                        : `${imageUrl}${data?.data?.profile}` || previewUrl
                                }
                            />
                        </div>
                        <div className="flex items-center gap-10">
                            <h3 className="font-semibold text-2xl">{data?.data?.name}</h3>

                            <input
                                type="file"
                                name="file"
                                id="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                            <div className="w-[22px] h-[22px] flex justify-center items-center rounded-full cursor-pointer">
                                <BiUpload size={24} onClick={() => document.getElementById('file')?.click()} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <Form form={form} onFinish={onFinish} layout="vertical">
                        <div>
                            <span className="text-[20px] font-semibold">Name</span>
                            <div className="mt-3">
                                <Form.Item name="name" rules={[{ required: true }]}>
                                    <Input
                                        className="h-14 bg-inputBg hover:bg-inputBg focus:bg-inputBg rounded-xl border-none"
                                        placeholder="Enter your name"
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div>
                            <span className="text-[20px] font-semibold">Email</span>
                            <div className="mt-3">
                                <Form.Item name="email" rules={[{ required: true }]}>
                                    <Input
                                        className="h-14 bg-inputBg hover:bg-inputBg focus:bg-inputBg rounded-xl border-none"
                                        placeholder="Enter your email"
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        {/* <div>
                            <span className="text-[20px] font-semibold">Contact Number</span>
                            <div className="mt-3">
                                <Form.Item name="contactNumber" rules={[{ required: true }]}>
                                    <Input
                                        className="h-14 bg-inputBg hover:bg-inputBg focus:bg-inputBg rounded-xl border-none"
                                        placeholder="Enter your contact number"
                                    />
                                </Form.Item>
                            </div>
                        </div> */}

                        <div className="mt-6">
                            <Button
                                htmlType="submit"
                                className="w-[30%] flex justify-center items-center text-2xl mt-14 rounded-md"
                            >
                                Save & Change
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
