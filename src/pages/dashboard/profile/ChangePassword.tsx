import { ConfigProvider, Form, Input } from 'antd';
import Button from '../../../components/shared/Button';
import { useChangePasswordMutation } from '../../../redux/apiSlices/currentPasswordSlice';
import { toast } from 'react-toastify';

export default function ChangePassword() {
    const [form] = Form.useForm();
    const [changePassword] = useChangePasswordMutation();

    const onFinish = async (values: any) => {
        try {
            await changePassword(values).unwrap();
            toast.success('Password Update Successfull');
            form.resetFields();
        } catch (error) {
            toast.error('Password is Wrong');
        }
    };

    return (
        <div className="flex flex-col mt-[6%]">
            <h1 className="text-2xl text-start ml-[16%] font-semibold">Change Password</h1>
            <div className="flex items-center justify-center mt-10">
                <div className="w-full lg:w-2/3  rounded-xl  pb-5 ">
                    <ConfigProvider
                        theme={{
                            components: {},
                        }}
                    >
                        <Form onFinish={onFinish} layout="vertical" form={form}>
                            <span className=" text-[20px] font-semibold ">Current password</span>
                            <Form.Item
                                name="currentPassword"
                                className="text-black"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your current password!',
                                    },
                                    {
                                        min: 6,
                                        message: 'Please input your current password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    className="h-14 bg-inputBg hover:bg-inputBg focus:bg-inputBg rounded-xl border-none"
                                    placeholder="enter your password"
                                />
                            </Form.Item>
                            <span className=" text-[20px] font-semibold ">New Password</span>
                            <Form.Item
                                name="newPassword"
                                className="text-black"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your new password!',
                                    },
                                    {
                                        min: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                ]}
                            >
                                <Input.Password
                                    placeholder="Enter your password"
                                    className="h-14 bg-inputBg  hover:bg-inputBg focus:bg-inputBg rounded-xl border-none"
                                />
                            </Form.Item>

                            <span className=" text-[20px] font-semibold ">Confirm Password</span>
                            <Form.Item
                                name="confirmPassword"
                                className="text-black"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your new password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    placeholder="Enter your password"
                                    className="h-14 bg-inputBg focus:bg-red-500 rounded-xl border-none"
                                />
                            </Form.Item>
                            <Form.Item>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Button: {
                                                defaultBg: '',

                                                defaultBorderColor: '',
                                                defaultActiveBorderColor: '',
                                                defaultColor: '',
                                                defaultActiveColor: '',
                                            },
                                        },
                                    }}
                                >
                                    <Button className="w-[20%] font-semibold text-[20px] rounded-md " htmlType="submit">
                                        Submit
                                    </Button>
                                </ConfigProvider>
                            </Form.Item>
                        </Form>
                    </ConfigProvider>
                </div>
            </div>
        </div>
    );
}
