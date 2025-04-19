import { ConfigProvider, Form, Input } from 'antd';

import { useNavigate } from 'react-router';
import newPass from '../../../public/auth/new-pass.svg';
import Button from '../../components/shared/Button';
import { useResetPasswodMutation } from '../../redux/apiSlices/authSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const NewPassword = () => {
    const navigate = useNavigate();
    const [resetPassword, { isSuccess, error, data, isLoading }] = useResetPasswodMutation();

    useEffect(() => {
        if (isSuccess) {
            if (data) {
                toast.success('Password Update Successfull');
                navigate('/login');
                window.location.reload();
            } else {
                toast.error('Password is Failed');
            }
        }
    }, [isSuccess, error, data, isLoading, navigate]);

    const onFinish = async (values: { newPassword: string; confirmPassword: string }) => {
        await resetPassword(values);
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#FBB040',
                    colorBgContainer: '#F1F4F9',
                },
                components: {
                    Input: {
                        borderRadius: 10,
                        colorBorder: 'transparent',
                        colorPrimaryBorder: 'transparent',
                        hoverBorderColor: 'transparent',
                        controlOutline: 'none',
                        activeBorderColor: 'transparent',
                    },

                    Button: {
                        colorPrimaryHover: 'rgb(0,0,0)',
                    },
                },
            }}
        >
            <div className="flex items-center justify-center h-screen">
                <div className="px-5">
                    <img src={newPass} width={460} height={460} alt="forgot" />
                </div>
                <span className="border-r-2 border-black h-[600px]"></span>
                <div className="flex  items-center justify-center pl-7">
                    <div className=" w-[550px] ">
                        <div className=" space-y-3 ">
                            <h1 className="text-3xl font-semibold  mb-5">Set a new password</h1>
                        </div>

                        <Form
                            name="normal_NewPassword"
                            className="NewPassword-form"
                            layout="vertical"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label={
                                    <label htmlFor="password" className="block  mb-1 text-lg">
                                        New Password
                                    </label>
                                }
                                name="newPassword"
                                rules={[{ required: true, message: 'Please input new password!' }]}
                            >
                                <Input.Password placeholder="KK!@#$15856" className=" h-12 px-6" />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <label htmlFor="password" className="block  mb-1 text-lg">
                                        Confirm Password
                                    </label>
                                }
                                name="confirmPassword"
                                rules={[{ required: true, message: 'Please input confirm password!' }]}
                            >
                                <Input.Password placeholder="KK!@#$15856" className="h-12 px-6" />
                            </Form.Item>

                            <Form.Item>
                                <Button className="bg-bgYellow w-full rounded-md text-[#181818] mt-5" htmlType="submit">
                                    {isLoading ? 'Updating' : 'Update Password'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default NewPassword;
