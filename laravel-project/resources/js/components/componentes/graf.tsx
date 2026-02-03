import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export default function Graf({ data }: { data: any[] }) {
  // Si no hay datos todavía, mostramos un mensaje o un array vacío
  const chartData = data && data.length > 0 ? data : [{ name: 'Sin datos', uv: 0 }];

  return (
    <div className="w-100">
      <div 
        className="card border-0 shadow-lg p-4" 
        style={{ backgroundColor: '#212529', borderRadius: '15px', height: '500px' }}
      >
        <h5 className="text-white small text-uppercase fw-bold mb-4 opacity-75">
          Evolución de Ventas Reales
        </h5>
        
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#373b3e" vertical={false} />
            <XAxis dataKey="name" stroke="#adb5bd" fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#adb5bd" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1d20', border: 'none', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#ff4d4d' }}
            />
            <Line 
              type="monotone" 
              dataKey="uv" 
              stroke="#ff4d4d" 
              strokeWidth={4} 
              dot={{ r: 6, fill: '#ff4d4d', strokeWidth: 2, stroke: '#212529' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}