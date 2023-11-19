"use client";

import {
    Bar,
    BarChart,
    Pie,
    ResponsiveContainer,
    XAxis,
    YAxis,
    PieChart,
    Cell,
    Legend,
} from "recharts";

interface PieChartProps {
    data: any[];
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export const AnalysisPieChart: React.FC<PieChartProps> = ({ data }) => {
    return (
        <div>
            <PieChart
                width={730}
                height={250}
                title="Biểu đồ % sự ảnh hưởng của hãng theo đơn hàng"
            >
                <Pie
                    data={data}
                    dataKey="count"
                    nameKey="name"
                    cx="40%"
                    cy="50%"
                    outerRadius={75}
                    labelLine={false}
                    label={renderCustomizedLabel}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={YOUR_COLOR_ARRAY[index]}
                        />
                    ))}
                </Pie>
                <Legend
                    align="left"
                    verticalAlign="top"
                    iconSize={10}
                    layout="radial"
                />
            </PieChart>
        </div>
    );
};

const YOUR_COLOR_ARRAY = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#83a6ed",
    "#8dd1e1",
    "#82ca9d",
    "#a4de6c",
    "#d0ed57",
    "#ffc658",
    "#fe8d33",
    "#f9a3a4",
    "#f86c6b",
];
