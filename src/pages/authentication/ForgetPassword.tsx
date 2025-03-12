import { ConfigProvider, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import forgots from '../../../public/auth/forgot.svg';
import Button from '../../components/shared/Button';
import { useForgetPasswordMutation } from '../../redux/apiSlices/authSlice';
import Swal from 'sweetalert2';

const ForgetPassword = () => {
    const [forgetPassword] = useForgetPasswordMutation();
    const navigate = useNavigate();
    const onFinish = async (values: { email: string }) => {
        try {
            const res = await forgetPassword(values);

            if (res?.data?.success) {
                Swal.fire({
                    text: res?.data?.message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    const value = {
                        email: values?.email,
                    };

                    if (values?.email) {
                        localStorage.setItem('email', JSON.stringify(value));
                    }

                    navigate('/verify-otp');
                });
            } else {
                Swal.fire({
                    title: 'Oops',
                    //@ts-ignore
                    text: res?.error?.data?.message || 'An error occurred, please try again.',
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        } catch (err) {
            console.error('Error occurred during forget password:', err);
            Swal.fire({
                title: 'Error',
                text: 'Something went wrong. Please try again later.',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    // colorPrimary: '#FBB040',
                    // colorBgContainer: '#F1F4F9',
                },
                components: {
                    Input: {
                        borderRadius: 10,
                        // colorBorder: '',
                        colorPrimaryBorder: 'transparent',
                        hoverBorderColor: '',
                        controlOutline: 'none',
                        activeBorderColor: '',
                    },
                    Button: {
                        colorPrimaryHover: 'rgb(0,0,0)',
                    },
                },
            }}
        >
            <div
                className="
            flex items-center justify-center h-screen"
            >
                <div className=" px-5">
                    <img src={forgots} width={460} height={460} alt="forgot" />
                </div>
                <span className="border-r-2 border-black h-[600px]"></span>
                <div className="flex items-center justify-center px-6">
                    <div className="w-[500px]">
                        <div className=" space-y-3 ">
                            <h1 className="text-3xl  font-semibold mt-2">Forget Password</h1>
                            <p className="text-[#757575]">
                                Enter your email address to ger a verification code for resetting your password.
                            </p>
                        </div>

                        <Form
                            name="normal_ForgetPassword"
                            className="ForgetPassword-form"
                            layout="vertical"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                                <Input
                                    placeholder="Enter your email address"
                                    type="email"
                                    className="h-12 mt-5 bg-white"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button htmlType="submit" className="w-full bg-authBg text-[#000000]">
                                    Get OTP
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ForgetPassword;
