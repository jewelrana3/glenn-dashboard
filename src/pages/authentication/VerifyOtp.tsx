import { ConfigProvider, Form, Input } from 'antd';

import { useNavigate } from 'react-router-dom';
import otp from '../../../public/auth/otp.svg';
import Button from '../../components/shared/Button';
import { useOtpVerifyMutation, useResendCodeMutation } from '../../redux/apiSlices/authSlice';
import Swal from 'sweetalert2';

const VerifyOtp = () => {
    const [otpVerify] = useOtpVerifyMutation();
    const [resendCode] = useResendCodeMutation();
    const navigate = useNavigate();
    const email = localStorage.getItem('email');
    const userEmail = email ? JSON.parse(email) : '';

    const handleResendCode = async () => {
        const data = {
            email: userEmail.email,
        };
        console.log({ data });

        try {
            const res = await resendCode(data);
            console.log(res);

            if (res?.data?.success) {
                Swal.fire({
                    text: res?.data?.message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    title: 'Oops',
                    // text: res?.error?.data?.message || 'An error occurred while processing your request.',
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error('Error during password reset request:', error);
            Swal.fire({
                title: 'Error',
                text: 'Something went wrong while trying to resend the code. Please try again later.',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    const onFinish = async (values: { otp: number | null }) => {
        const data = {
            email: userEmail.email,
            oneTimeCode: Number(values?.otp),
        };

        await otpVerify(data).then((res) => {
            if (res?.data?.success) {
                localStorage.setItem('oneTimeToken', res?.data?.data);
                Swal.fire({
                    text: res?.data?.message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    localStorage.setItem('resetToken', res?.data?.data);
                    navigate('/new-password');
                });
            } else {
                Swal.fire({
                    title: 'Oops',
                    //@ts-ignore
                    text: res?.error?.data?.message,
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        });
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        // lineHeight: 3,
                        controlHeight: 50,

                        borderRadius: 10,
                    },
                },
                token: {
                    colorPrimary: '#FBB040',
                },
            }}
        >
            <div
                className="
            flex items-center justify-center h-screen"
            >
                <div className="px-5">
                    <img src={otp} width={460} height={460} alt="forgot" />
                </div>
                <span className="border-r-2 border-black h-[600px]"></span>
                <div className="flex  items-center justify-center pl-8">
                    <div className=" w-[500px] ">
                        <div className=" space-y-3 ">
                            <h1 className="text-3xl  font-semibold  mt-2">Verify OTP</h1>
                            <p className="text-[#757575]">
                                Please check your email. We have sent a code to contact @gmail.com
                            </p>
                        </div>

                        <Form
                            name="normal_VerifyOtp"
                            className="my-5"
                            layout="vertical"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                className="flex items-center justify-center mx-auto "
                                name="otp"
                                rules={[{ required: true, message: 'Please input otp code here!' }]}
                            >
                                <Input.OTP
                                    style={{
                                        width: 300,
                                    }}
                                    className=""
                                    // variant="filled"
                                    length={6}
                                />
                            </Form.Item>
                            <div className="text-lg flex items-center justify-between gap-2 mb-8">
                                <p className="">Didn't receive the code?</p>
                                <p
                                    className="text-[#79CAA1] font-semibold underline cursor-pointer"
                                    onClick={handleResendCode}
                                >
                                    Resend
                                </p>
                            </div>

                            <Form.Item>
                                <Button className="bg-bgYellow w-full rounded-md text-[#181818]" htmlType="submit">
                                    Verify
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VerifyOtp;
