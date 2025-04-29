import { ShoppingBag, MessageSquare, ArrowUpRight, CreditCard } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import CampaignStatus from '../components/dashboard/CampaignStatus';
import { formatCurrency, formatNumber } from '../lib/utils';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Monitoramento de performance das campanhas de recuperação</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Carrinhos Recuperados"
          value={formatNumber(187)}
          icon={<ShoppingBag className="h-4 w-4" />}
          trend={{ value: 12.5, label: 'vs mês anterior' }}
        />
        <StatCard
          title="Mensagens Enviadas"
          value={formatNumber(4328)}
          icon={<MessageSquare className="h-4 w-4" />}
          trend={{ value: 8.3, label: 'vs mês anterior' }}
        />
        <StatCard
          title="Taxa de Conversão"
          value="9.8%"
          icon={<ArrowUpRight className="h-4 w-4" />}
          trend={{ value: 2.1, label: 'vs mês anterior' }}
        />
        <StatCard
          title="Receita Recuperada"
          value={formatCurrency(23450)}
          icon={<CreditCard className="h-4 w-4" />}
          trend={{ value: 15.7, label: 'vs mês anterior' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div>
          <CampaignStatus />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;