import { useState } from 'react';
import { Form, Input, Avatar, Upload, UploadFile, ConfigProvider } from 'antd';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { UploadChangeParam } from 'antd/es/upload/interface';
import { BiUpload } from 'react-icons/bi';
import Button from '../../../components/shared/Button';
import { useProfileQuery, useUpdateProfileMutation } from '../../../redux/apiSlices/profileSlice';
import Swal from 'sweetalert2';

interface formValues {
    name: string;
    email: string;
    contactNumber: string;
    profile: string;
}

export default function EditProfile() {
    const { data, refetch } = useProfileQuery(undefined);
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState<string>(data?.data?.profile);
    const [updateProfile] = useUpdateProfileMutation();

    const [form] = Form.useForm();

    const onFinish = async (values: formValues) => {
        const updateValues = { ...values, profile: imageUrl };
        console.log(updateValues);

        try {
            const res = await updateProfile(updateValues);
            if (res?.data?.success) {
                Swal.fire({
                    text: res?.data?.message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    form.resetFields();
                    refetch();
                    navigate(-1);
                });
            } else {
                // Handle the case where the response is not successful
                Swal.fire({
                    text: 'Profile update failed',
                    icon: 'error',
                    showConfirmButton: true,
                });
            }
        } catch (err) {
            Swal.fire({
                // @ts-ignore
                text: err?.data?.message,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handleImageChange = (info: UploadChangeParam<UploadFile<any>>) => {
        if (info.file.status === 'done') {
            setImageUrl(info.file.response?.url || '');
        } else if (info.file.status === 'uploading') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string); // Make sure to cast the result to string
            };
            reader.readAsDataURL(info.file.originFileObj!); // Using "!" to assert the object is not null
        }
    };

    return (
        <div className="overflow-hidden">
            {/* profile */}

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
                            <div className="">
                                <Avatar size={100} src={imageUrl} />
                            </div>
                        </div>
                        <div className="flex items-center gap-10">
                            <h3 className="font-semibold text-2xl">{data?.data?.name}</h3>
                            <Upload showUploadList={false} onChange={handleImageChange} accept="image/*">
                                <div className="w-[22px] h-[22px] flex justify-center items-center rounded-full cursor-pointer">
                                    <BiUpload className="mt-3" size={24} />
                                </div>
                            </Upload>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <Form form={form} onFinish={onFinish} layout="vertical">
                        <div>
                            <span className=" text-[20px] font-semibold ">Name</span>
                            <div className="mt-3">
                                <Form.Item name="name" rules={[{ required: true }]}>
                                    <Input
                                        className="h-14 bg-inputBg hover:bg-inputBg focus:bg-inputBg rounded-xl border-none"
                                        placeholder="enter your name"
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div>
                            <span className=" text-[20px] font-semibold ">Email</span>
                            <div className="mt-3">
                                <Form.Item name="email" rules={[{ required: true }]}>
                                    <Input
                                        className="h-14 bg-inputBg hover:bg-inputBg focus:bg-inputBg rounded-xl border-none"
                                        placeholder="enter your email"
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div>
                            <span className=" text-[20px] font-semibold ">Contact Number</span>
                            <div className="mt-3 ">
                                <Form.Item name="contactNumber" rules={[{ required: true }]}>
                                    <Input
                                        className="h-14 bg-inputBg hover:bg-inputBg focus:bg-inputBg rounded-xl border-none"
                                        placeholder="enter your contact number"
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="mt-6">
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            defaultHoverBg: '',

                                            defaultHoverBorderColor: '',
                                            defaultActiveBorderColor: '',
                                            defaultHoverColor: '',
                                            defaultActiveColor: '',
                                        },
                                    },
                                }}
                            >
                                <Button
                                    htmlType="submit"
                                    className="w-[30%] flex justify-center items-center text-2xl mt-14 rounded-md"
                                >
                                    Save & Change
                                </Button>
                            </ConfigProvider>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
