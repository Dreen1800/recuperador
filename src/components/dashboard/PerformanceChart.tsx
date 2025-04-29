import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

// Sample data for the chart
const data = [
  { name: '01/Mai', messages: 65, interactions: 43, conversions: 12 },
  { name: '02/Mai', messages: 78, interactions: 52, conversions: 15 },
  { name: '03/Mai', messages: 82, interactions: 56, conversions: 18 },
  { name: '04/Mai', messages: 70, interactions: 48, conversions: 14 },
  { name: '05/Mai', messages: 92, interactions: 63, conversions: 21 },
  { name: '06/Mai', messages: 105, interactions: 72, conversions: 25 },
  { name: '07/Mai', messages: 115, interactions: 80, conversions: 32 },
];

type TimeRange = '7d' | '30d' | '90d';

const PerformanceChart = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Performance das Campanhas</CardTitle>
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {(['7d', '30d', '90d'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`text-xs px-3 py-1 rounded-md transition-colors ${
                  timeRange === range
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px', 
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }} 
              />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '8px', 
                  fontSize: '12px'
                }} 
              />
              <Line
                type="monotone"
                dataKey="messages"
                stroke="#3366FF"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                name="Mensagens Enviadas"
              />
              <Line
                type="monotone"
                dataKey="interactions"
                stroke="#6366F1"
                strokeWidth={2}
                name="Interações"
              />
              <Line
                type="monotone"
                dataKey="conversions"
                stroke="#10B981"
                strokeWidth={2}
                name="Conversões"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;