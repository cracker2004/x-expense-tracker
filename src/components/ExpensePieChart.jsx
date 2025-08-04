import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export default function ExpensePieChart({ categoryExpenses }) {
  const data = [
    { name: "Food", value: categoryExpenses.food },
    { name: "Travel", value: categoryExpenses.travel },
    { name: "Entertainment", value: categoryExpenses.entertainment },
  ];

  const RADIAN = Math.PI / 180;
  const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

  const renderCustomizedLabel = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-(midAngle || 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle || 0) * RADIAN);

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
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-[30vh] max-md:min-h-[30vh] max-md:w-full gap-y-6">
      <ResponsiveContainer width={200} height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="flex gap-x-2 justify-center items-center mb-3">
        <div className="flex items-center justify-center gap-x-0.5">
          <span
            className="inline-block w-6 h-3"
            style={{ backgroundColor: COLORS[0] }}
          ></span>
          <h2 className="text-sm">Food</h2>
        </div>
        <div className="flex items-center justify-center gap-x-0.5">
          <span
            className="inline-block w-6 h-3"
            style={{ backgroundColor: COLORS[1] }}
          ></span>
          <h2 className="text-sm">Travel</h2>
        </div>
        <div className="flex items-center justify-center gap-x-0.5">
          <span
            className="inline-block w-6 h-3"
            style={{ backgroundColor: COLORS[2] }}
          ></span>
          <h2 className="text-sm">Entertainment</h2>
        </div>
      </div>
    </div>
  );
}
