import { Checkbox, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button';

const SignUp = () => {
    const navigate = useNavigate();
    const onFinish: FormProps<FieldNamesType>['onFinish'] = (values) => {
        'Received values of form: ', values;
        navigate('/');
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
                        colorBorder: '#757575',
                        colorPrimaryBorder: 'transparent',
                        hoverBorderColor: 'transparent',
                        controlOutline: 'none',
                        activeBorderColor: '#757575',
                    },
                    Button: {
                        colorPrimaryHover: 'rgb(0,0,0)',
                    },
                },
            }}
        >
            <div className="flex items-center justify-center h-screen ">
                <div className=" w-[650px] rounded-lg  border border-primaryColor p-14 ">
                    <div className="space-y-3 text-center">
                        <h1 className="text-3xl  font-semibold text-center mt-2">Sign Up</h1>
                        <p className="text-lg font-semibold text-[#757575]">Enter details to create your account</p>
                    </div>

                    <Form
                        name="normal_login"
                        className="login-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <label htmlFor="name" className="block  mb-1 text-lg">
                                    Full Name
                                </label>
                            }
                            name="email"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input placeholder="Enter your name" type="name" className=" h-12  px-6 bg-white" />
                        </Form.Item>

                        <Form.Item
                            label={
                                <label htmlFor="email" className="block  mb-1 text-lg">
                                    Email
                                </label>
                            }
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input
                                placeholder="Enter your email address"
                                type="email"
                                className=" h-12  px-6 bg-white"
                            />
                        </Form.Item>

                        <Form.Item
                            label={
                                <label htmlFor="password" className="block  mb-1 text-lg">
                                    Password
                                </label>
                            }
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password placeholder="Enter your password" className=" h-12  px-6" bg-white />
                        </Form.Item>

                        <div className="flex items-center justify-between mb-4">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox className=" text-lg">Remember me</Checkbox>
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <Button
                                className="w-full"
                                htmlType="submit"

                                // onClick={() => navigate('/')}
                            >
                                Sign Up
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="flex justify-end ">
                        <Link to="/login">
                            <p className="text-[#8DB501] font-bold underline cursor-pointer">Sign In</p>
                        </Link>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default SignUp;
