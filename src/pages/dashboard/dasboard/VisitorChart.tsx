import { ConfigProvider, Select } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useGetVisitorsQuery } from '../../../redux/apiSlices/dashboard/dashboardSlice';
const { Option } = Select;

export default function VisitorChart() {
    const { data: visitorData } = useGetVisitorsQuery(undefined);

    const data = visitorData?.map((value: { month: string; total: number }) => ({
        name: value?.month,
        visitor: value?.total,
    }));
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
            }}
            className="p-4 bg-[#d6e7e3]"
        >
            <div className=" flex items-center justify-between">
                <h1 className="text-2xl font-medium">Total Visitor</h1>
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
                        dataKey="visitor"
                        stroke="#0c6666"
                        strokeWidth={2}
                        dot={{ fill: '#0c6666', stroke: '#0c6666', strokeWidth: 2, r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
