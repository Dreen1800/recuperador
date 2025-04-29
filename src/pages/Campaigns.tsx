import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import Button from '../components/ui/Button';
import CampaignCard from '../components/campaigns/CampaignCard';

// Sample campaign data for demonstration
const sampleCampaigns = [
  {
    id: '1',
    name: 'Abandono de checkout - Moda',
    description: 'Recuperação de clientes que abandonaram o checkout na categoria moda nos últimos 30 minutos.',
    status: 'active' as const,
    startDate: '02/05/2023',
    stats: {
      sent: 2354,
      responses: 874,
      conversions: 215,
      revenue: 8620
    }
  },
  {
    id: '2',
    name: 'Carrinho abandonado - Eletrônicos',
    description: 'Sequência de 3 mensagens para recuperação de carrinhos abandonados na categoria eletrônicos.',
    status: 'paused' as const,
    startDate: '15/04/2023',
    stats: {
      sent: 1752,
      responses: 623,
      conversions: 158,
      revenue: 12480
    }
  },
  {
    id: '3',
    name: 'Recuperação - Black Friday',
    description: 'Campanha especial para recuperação de carrinhos durante a Black Friday.',
    status: 'draft' as const,
    startDate: 'N/A',
    stats: {
      sent: 0,
      responses: 0,
      conversions: 0,
      revenue: 0
    }
  },
  {
    id: '4',
    name: 'Follow-up Produtos Premium',
    description: 'Sequência de mensagens para clientes que abandonaram produtos premium no carrinho.',
    status: 'scheduled' as const,
    startDate: '10/06/2023',
    stats: {
      sent: 0,
      responses: 0,
      conversions: 0,
      revenue: 0
    }
  }
];

const Campaigns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleCreateCampaign = () => {
    navigate('/campaigns/new');
  };

  const handleEditCampaign = (id: string) => {
    navigate(`/campaigns/${id}`);
  };

  const filteredCampaigns = sampleCampaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Campanhas</h1>
          <p className="text-gray-600">Gerencie suas campanhas de recuperação de vendas</p>
        </div>
        <Button
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={handleCreateCampaign}
        >
          Nova Campanha
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar campanhas..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          leftIcon={<Filter className="h-4 w-4" />}
        >
          Filtrar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map(campaign => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onEdit={handleEditCampaign}
          />
        ))}
      </div>
    </div>
  );
};

export default Campaigns;