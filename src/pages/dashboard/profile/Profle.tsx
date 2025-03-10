import { useState } from 'react';
import { Form, Input, Avatar, ConfigProvider } from 'antd';
import { MdOutlineArrowBackIosNew, MdOutlineModeEdit } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

import CustomButton from '../../../components/shared/Button';

export default function Profile() {
    const navigate = useNavigate();
    const [imageUrl] = useState<string>('https://i.ibb.co.com/ZzZ1DXff/Frame-2147226688.png');

    const [form] = Form.useForm();

    return (
        <div className="flex justify-center items-center">
            {/* profile */}

            <div className="w-[1035px] mx-auto">
                <div className="flex items-center gap-4 font-semibold text-[20px]" onClick={() => navigate(-1)}>
                    <button className="text-xl">
                        <MdOutlineArrowBackIosNew />
                    </button>
                    <button>Profile</button>
                </div>

                <div className="flex items-center justify-between gap-4  mt-12">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Avatar size={100} src={imageUrl} className="border-2 border-[#8AC2FF]" />
                        </div>

                        <div>
                            <h3 className="font-semibold text-2xl">Samuel Jacob Reed</h3>
                        </div>
                    </div>
                    <div className="">
                        <Link to="/edit-profile">
                            <CustomButton className=" flex items-center justify-center space-x-2 cursor-pointer">
                                <MdOutlineModeEdit className="text-xl mr-2" /> {/* This adds the icon */}
                                Edit Profile
                            </CustomButton>
                        </Link>
                    </div>
                </div>

                <div className="mt-5">
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    hoverBorderColor: '#EBF4FF',
                                    activeBorderColor: '#EBF4FF',
                                },
                            },
                        }}
                    >
                        <Form form={form} layout="vertical">
                            <div>
                                <span className=" text-[20px] font-semibold ">Full Name</span>
                                <div className="mt-3 ">
                                    <Form.Item name="fullname" rules={[{ required: true }]}>
                                        <Input
                                            className="h-14 bg-inputBg hover:bg-inputBg focus:bg-inputBg rounded-xl border-none"
                                            placeholder="enter your email"
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
                                            placeholder="enter your gmail"
                                        />
                                    </Form.Item>
                                </div>
                            </div>

                            <div>
                                <span className=" text-[20px] font-semibold ">Password</span>
                                <div className="mt-3">
                                    <Form.Item name="password" rules={[{ required: true }]}>
                                        <Input.Password
                                            className="h-14 bg-inputBg hover:bg-inputBg focus:bg-inputBg rounded-xl border-none"
                                            placeholder="Password"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </Form>
                    </ConfigProvider>
                </div>
            </div>
        </div>
    );
}
