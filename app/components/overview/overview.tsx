"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

interface OverviewProps {
    data: any[];
}

export const Overview: React.FC<OverviewProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart
                data={data}
                title="Doanh thu qua từng tháng"
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#a3e635" radius={[4, 4, 0, 0]} />
                {/* #3498db #adfa1d*/}
            </BarChart>
        </ResponsiveContainer>
    );
};
