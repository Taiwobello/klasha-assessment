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
  showCartesianGrid?: boolean;
}

function Chart(props: ChartProps) {
  const {
    data,
    height,
    width,
    hideXaxis,
    hideYaxis,
    dataKey,
    dataKeyXAxis,
    showCartesianGrid,
  } = props;
  return (
    <ResponsiveContainer width={width || "100%"} height={height || 400}>
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
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef2c5a69" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ef2c5a69" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey={dataKeyXAxis} hide={hideXaxis} />
        <YAxis hide={hideYaxis} axisLine={false} />
        {showCartesianGrid && <CartesianGrid vertical={false} />}
        <Tooltip />
        <Area
          type="linear"
          dataKey={dataKey || ""}
          stroke="#EF2C5A"
          fill="url(#colorUv)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Chart;
