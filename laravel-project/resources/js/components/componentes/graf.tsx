import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie } from 'recharts';

const data = [
  { name: 'Ene', uv: 400 },
  { name: 'Feb', uv: 300 },
  { name: 'Mar', uv: 600 },
  { name: 'Abr', uv: 400 },
  { name: 'May', uv: 1000 },
  { name: 'Jun', uv: 600 },
];

export default function Graf() {
  return (
    <div>
        <LineChart width={750} height={300} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#ff0000ff" />
        <CartesianGrid stroke="#463939ff" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        </LineChart>

        <PieChart width={400} height={400}>
            <Pie data={data} dataKey="uv" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" />
            <Tooltip />
        </PieChart>
    </div>
    
  );
}
