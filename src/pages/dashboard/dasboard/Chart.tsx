import { ConfigProvider, Select } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useGetUsersQuery } from '../../../redux/apiSlices/dashboard/dashboardSlice';
const { Option } = Select;

export default function Chart() {
    const { data: userData } = useGetUsersQuery(undefined);

    const data = userData?.map((value: { month: string; customer: number; seller: number }) => ({
        name: value?.month,
        customer: value?.customer,
        seller: value?.seller,
    }));
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
            }}
            className="p-4 bg-[#f8f8f8]"
        >
            <div className=" flex items-center justify-between">
                <h1 className="text-2xl font-medium">Users Statics</h1>
                <ConfigProvider
                    theme={{
                        components: {
                            Select: {
                                colorPrimary: '',
                            },
                        },
                    }}
                >
                    <Select defaultValue="2025" className="w-32 h-[40px] !border-none">
                        <Option value="2025">2025</Option>
                        <Option value="2026">2026</Option>
                        <Option value="2027">2027</Option>
                        <Option value="2028">2028</Option>
                        <Option value="2029">2029</Option>
                        <Option value="2030">2030</Option>
                    </Select>
                </ConfigProvider>
            </div>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 300]} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="customer"
                        stroke="#3395FF"
                        strokeWidth={2}
                        dot={{ fill: '#3395FF', stroke: '#3395FF', strokeWidth: 2, r: 4 }}
                    />

                    <Line
                        type="monotone"
                        dataKey="seller"
                        stroke="#f7cc7e"
                        strokeWidth={2}
                        dot={{ fill: '#3395FF', stroke: '#f7cc7e', strokeWidth: 2, r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
