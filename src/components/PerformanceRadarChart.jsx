import React from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";
import "../css/style.css"; 

const CustomTooltip = ({ payload, coordinate }) => {
  if (payload && payload.length > 0) {
    const value = payload[0].value;
    const percentage = (value / 200) * 100;

    const tooltipPosition = {
      x: coordinate.x + 10,
      y: coordinate.y - 30,
    };

    return (
      <div
        className="tooltip-text-pourcent"
        style={{
          left: `${tooltipPosition.x}px`,
          top: `${tooltipPosition.y}px`,
          position: "absolute",
        }}
      >
        {`${percentage.toFixed(1)}%`}
      </div>
    );
  }
  return null;
};

const PerformanceRadarChart = ({ performanceData }) => {
  return (
    <div className="performance-wrapper">
      <ResponsiveContainer className="performance-container">
        <RadarChart
          outerRadius="60%"
          data={performanceData}
          onMouseEnter={(e) => e?.stopPropagation()}
        >
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="subject"
            stroke="white"
            tick={{ fill: "white", fontSize: 14 }}
            tickLine={false}
            axisLine={false}
          />
          <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 200]} />
          <Radar
            name="Performance"
            dataKey="value"
            fill="red"
            fillOpacity={0.7}
            dot={false}
            activeDot={false}
          />
          <Tooltip cursor={false} content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceRadarChart;
