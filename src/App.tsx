import MainLayout from './components/layout/MainLayout';
import { ConfigProvider } from 'antd';

function App() {
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        // colorPrimary: '#FBB040',
                    },
                    components: {
                        Table: {
                            headerColor: '#ffff',
                            headerBg: '#FFAB3E',
                            // colorBgContainer: '#181c1d ',
                            colorText: '',
                            headerSplitColor: '',
                            padding: 5,

                            fontFamily: 'Poppins',
                        },
                        Select: {
                            colorBgContainer: '',
                        },
                        Checkbox: {
                            colorBgContainer: 'rgb(255,66,66)',
                            colorPrimary: 'rgb(241,247,247)',
                        },
                    },
                }}
            >
                <MainLayout />
            </ConfigProvider>
        </>
    );
}

export default App;
