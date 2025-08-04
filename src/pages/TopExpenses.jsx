
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


export default function TopExpenses({ categoryExpenses }) {

  const temp = [
    { category: "Food", amount: categoryExpenses.food },
    { category: "Travel", amount: categoryExpenses.travel },  
    { category: "Entertainment", amount: categoryExpenses.entertainment },
  ]
  const data = temp.sort((a, b) => b.amount - a.amount);


  return (
    <div className="flex-2">
      <h2 className="text-lg font-semibold mb-2 max-md:text-center">
        Top Expenses
      </h2>
      <div className="border bg-white rounded-lg md:h-[42vh]">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
            barSize={20}
          >
            {/* REMOVE CartesianGrid to get rid of dotted lines */}
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis type="number" tick={false} axisLine={false} />{" "}
            {/* hide numbers and line */}
            <YAxis
              dataKey="category"
              type="category"
              axisLine={false} // hides the Y-axis vertical line
              tickLine={true} // hides the small lines at each tick
              tick={{ fontSize: 12, fill: "#333" }}
            />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" radius={[0, 3, 3, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

