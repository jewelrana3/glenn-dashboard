import { ConfigProvider, Select } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
const { Option } = Select;
const data = [
    { name: 'Jan', earnings: 200 },
    { name: 'Feb', earnings: 200 },
    { name: 'Mar', earnings: 100 },
    { name: 'Apr', earnings: 100 },
    { name: 'May', earnings: 200 },
    { name: 'Jun', earnings: 300 },
    { name: 'Jul', earnings: 500 },
    { name: 'Aug', earnings: 600 },
    { name: 'Sep', earnings: 700 },
    { name: 'Oct', earnings: 800 },
    { name: 'Nov', earnings: 600 },
    { name: 'Dec', earnings: 500 },
];

export default function Chart() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
            }}
            className="p-4 bg-[#F8F8F8]"
        >
            <div className=" flex items-center justify-between">
                <h1 className="text-2xl font-medium">Total Seller</h1>
                <ConfigProvider
                    theme={{
                        components: {
                            Select: {
                                colorPrimary: '',
                            },
                        },
                    }}
                >
                    <Select defaultValue="2024" className="w-32 h-[40px] !border-none">
                        <Option value="2024">2024</Option>
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
                    <YAxis domain={[0, 800]} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="earnings"
                        stroke="#3395FF"
                        strokeWidth={2}
                        dot={{ fill: '#3395FF', stroke: '#3395FF', strokeWidth: 2, r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
