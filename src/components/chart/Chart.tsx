import React from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

interface ChartProps {
  data: any;
  height?: number;
  width?: string;
  hideXaxis?: boolean;
  hideYaxis?: boolean;
  dataKey?: string;
  dataKeyXAxis?: string;
}

function Chart(props: ChartProps) {
  const { data, height, width, hideXaxis, hideYaxis, dataKey, dataKeyXAxis } =
    props;
  return (
    <ResponsiveContainer width={width || "105%"} height={height || 400}>
      <AreaChart
        width={700}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey={dataKeyXAxis} hide={hideXaxis} />
        <YAxis hide={hideYaxis} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey={dataKey || ""}
          stroke="#EF2C5A"
          fill="#EF2C5A"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Chart;
