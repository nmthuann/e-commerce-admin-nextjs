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

export const AnalysisPieChart: React.FC<PieChartProps> = ({ data }) => {
    return (
        <div>
            <PieChart
                width={730}
                height={250}
                title="Biểu đồ % sự ảnh hưởng của hãng theo đơn hàng"
            >
                {/*   <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    fill="#8884d8"
          
                    label
                /> */}
                <Pie
                    data={data}
                    dataKey="ma"
                    nameKey="name"
                    cx="40%"
                    cy="50%"
                    outerRadius={75}
                    label
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
