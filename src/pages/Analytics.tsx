import { useState } from 'react';
import { Calendar, ArrowRight, DownloadCloud } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { formatCurrency, formatNumber } from '../lib/utils';

type TimeRange = '7d' | '30d' | '90d' | 'custom';

// Sample data for charts
const conversionData = [
  { name: 'Enviadas', value: 4328 },
  { name: 'Visualizadas', value: 3865 },
  { name: 'Respondidas', value: 1247 },
  { name: 'Conversões', value: 432 }
];

const revenueByDay = [
  { name: '01/Mai', value: 1250 },
  { name: '02/Mai', value: 1580 },
  { name: '03/Mai', value: 1320 },
  { name: '04/Mai', value: 980 },
  { name: '05/Mai', value: 1640 },
  { name: '06/Mai', value: 2100 },
  { name: '07/Mai', value: 1875 },
];

const campaignPerformance = [
  { name: 'Abandono de Checkout', conversions: 125, revenue: 12580 },
  { name: 'Carrinho Abandonado', conversions: 87, revenue: 7890 },
  { name: 'Recuperação Black Friday', conversions: 215, revenue: 21450 },
  { name: 'Follow-up Produtos Premium', conversions: 65, revenue: 8640 },
];

const COLORS = ['#3366FF', '#6366F1', '#10B981', '#F59E0B'];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
          <p className="text-gray-600">Análise de desempenho das campanhas</p>
        </div>
        <div className="flex items-center space-x-3">
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
                {range === '7d' ? '7 dias' : range === '30d' ? '30 dias' : '90 dias'}
              </button>
            ))}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<Calendar className="h-4 w-4" />}
            onClick={() => setTimeRange('custom')}
          >
            Período Personalizado
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<DownloadCloud className="h-4 w-4" />}
          >
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Receita Recuperada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {formatCurrency(23450)}
            </div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowRight className="h-4 w-4 mr-1 transform rotate-45" />
              <span>15.7% vs. período anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Recuperação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              9.8%
            </div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowRight className="h-4 w-4 mr-1 transform rotate-45" />
              <span>2.1% vs. período anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total de Mensagens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {formatNumber(4328)}
            </div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowRight className="h-4 w-4 mr-1 transform rotate-45" />
              <span>8.3% vs. período anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Receita por Dia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueByDay}
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tickFormatter={(value) => `R$${value}`}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                  />
                  <Tooltip 
                    formatter={(value) => [`R$${value}`, 'Receita']}
                    contentStyle={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#3366FF" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Funil de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={conversionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                    labelLine={false}
                  >
                    {conversionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    wrapperStyle={{ paddingTop: '20px' }}
                  />
                  <Tooltip 
                    formatter={(value) => [formatNumber(value as number), 'Quantidade']}
                    contentStyle={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Performance por Campanha</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Nome da Campanha</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Mensagens</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Visualizadas</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Respondidas</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Conversões</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Taxa</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Receita</th>
                </tr>
              </thead>
              <tbody>
                {campaignPerformance.map((campaign, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-800">{campaign.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{formatNumber(campaign.conversions * 10)}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{formatNumber(campaign.conversions * 9)}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{formatNumber(campaign.conversions * 3)}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{formatNumber(campaign.conversions)}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{(campaign.conversions / (campaign.conversions * 10) * 100).toFixed(1)}%</td>
                    <td className="py-3 px-4 text-sm font-medium text-green-600">{formatCurrency(campaign.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;