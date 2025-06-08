import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const GraphicPizza = ({ data, dataKey, nameKey, title }: any) => {
  const COLORS = ["#4caf50", "#81c784", "#c8e6c9", "#388e3c", "#66bb6a"];

  return (
    <div>
      <h3>{title}</h3>
      {data?.length ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data || []}
              dataKey={dataKey}
              nameKey={nameKey}
              outerRadius={100}
              fill="#38853b"
              label
            >
              {data?.map((entry: any, index: any) => (
                <Cell key={entry.state} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div>
          <p>Nenhum dado disponível.</p>
        </div>
      )}
    </div>
  );
};

export default GraphicPizza;
