import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import "../css/style.css";

const CustomTooltip = ({ payload }) => {
  if (payload && payload.length > 0) {
    const kg = payload[0].payload.kilogram;
    const calories = payload[1].payload.calories * 40;
    return (
      <div className="custom-tooltip">
        <p>{`${kg} kg`}</p>
        <p>{`${calories} kCal`}</p>
      </div>
    );
  }
  return null;
};

const ActiviteQuotidienneChart = ({ sessionData, minKilograms, maxKilograms }) => {
  return (
    <div className="activite-quotidienne-wrapper">
      <div className="header-activite">
        <h2 className="titre-activite-quotidienne">Activité quotidienne</h2>
        <div className="custom-legend">
          <span className="legend-item">
            <span className="square kilogram-square"></span> Poids (kg)
          </span>
          <span className="legend-item">
            <span className="square calories-square"></span> Calories brûlées (kCal)
          </span>
        </div>
      </div>

      <ResponsiveContainer className="activite-quotidienne-container" height={252}>
        <BarChart data={sessionData} className="bar-chart-gap">
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tickLine={false} />
          <YAxis
            yAxisId="left"
            tickFormatter={(value) => Math.round(value)}
            domain={[minKilograms - 2, maxKilograms + 2]}
            orientation="right"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(value) => value * 10}
            domain={[0, (dataMax) => dataMax + 5]}
            hide={true}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="kilogram"
            name="Poids (kg)"
            yAxisId="left"
            className="kilogram-bar"
            barSize={10}
            radius={[5, 5, 0, 0]}
          />
          <Bar
            dataKey="calories"
            name="Calories brûlées"
            yAxisId="right"
            className="calories-bar"
            barSize={10}
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActiviteQuotidienneChart;
