import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import "../css/style.css";

const CustomTooltip = ({ payload }) => {
  if (payload && payload.length > 0) {
    const sessionLength = payload[0].payload.sessionLength;
    return (
      <div className="custom-tooltip-session">
        <p>{`${sessionLength} min`}</p>
      </div>
    );
  }
  return null;
};

const DureeSessionChart = ({ sessionLengthData }) => {
  return (
    <div className="duree-session-wrapper" style={{ height: 240 }}>
      <h2 className="titre-duree-session">Durée moyenne des Sessions</h2>
      <ResponsiveContainer className="duree-session-container" height={130}>
        <LineChart data={sessionLengthData}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={({ x, y, payload }) => (
              <text
                x={x + 20}
                y={y + 20}
                textAnchor="middle"
                fill="rgba(255, 255, 255, 0.5)"
                fontSize={14}
              >
                {payload.value}
              </text>
            )}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={() => null} />
          <Line
            type="monotone"
            dataKey="sessionLength"
            dot={false}
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DureeSessionChart;
