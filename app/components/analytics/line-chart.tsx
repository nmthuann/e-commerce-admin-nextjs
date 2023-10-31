import {
    Legend,
    LineChart,
    Line,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
// import { CartesianGrid } from "recharts/types/cartesian/CartesianGrid";

interface PieChartProps {
    data: any[];
}

export const AnalysisLineChart: React.FC<PieChartProps> = ({ data }) => {
    return (
        <div>
            <LineChart
                title="Biểu đồ mức độ ảnh hưởng đơn hàng Trực Tuyến và Tại Quầy"
                width={730}
                height={250}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        </div>
    );
};
