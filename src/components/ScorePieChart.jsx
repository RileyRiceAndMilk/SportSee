import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import "../css/style.css"; 

const ScorePieChart = ({ scoreData, startAngle = 90 }) => {
  return (
    <div className="score-wrapper">
      <p className="score-title">score</p>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={scoreData}
            dataKey="value"
            innerRadius="50%"
            outerRadius="60%"
            fill="#000000"
            paddingAngle={5}
            startAngle={startAngle}
            endAngle={startAngle + 360}
            cx="50%"
            cy="50%"
            cornerRadius={10}
            stroke="none"
          >
            {scoreData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.name === "Score" ? "#FF0000" : "#ebebeb"}
              />
            ))}
          </Pie>
          <text
            x="50%"
            y="48%"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="24px"
            fontWeight="bold"
            fill="#000000"
          >
            {`${scoreData[0].value}%`}
          </text>
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            fontSize="14px"
            fill="#8C8F95"
          >
            de votre objectif
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScorePieChart;
