import { MessageSquare, Calendar, BarChart3, ExternalLink } from 'lucide-react';
import { Card } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { formatNumber, formatCurrency } from '../../lib/utils';

interface CampaignCardProps {
  campaign: {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'paused' | 'draft' | 'scheduled';
    startDate: string;
    stats: {
      sent: number;
      responses: number;
      conversions: number;
      revenue: number;
    };
  };
  onEdit: (id: string) => void;
}

const CampaignCard = ({ campaign, onEdit }: CampaignCardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Ativa</Badge>;
      case 'paused':
        return <Badge variant="warning">Pausada</Badge>;
      case 'draft':
        return <Badge variant="default">Rascunho</Badge>;
      case 'scheduled':
        return <Badge variant="info">Agendada</Badge>;
      default:
        return <Badge>Inativa</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col h-full">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{campaign.name}</h3>
            {getStatusBadge(campaign.status)}
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{campaign.description}</p>
        </div>
        
        <div className="p-6 flex-1">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 text-gray-500 mr-2" />
              <div>
                <div className="text-sm text-gray-500">Mensagens</div>
                <div className="font-medium">{formatNumber(campaign.stats.sent)}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
              <div>
                <div className="text-sm text-gray-500">Início</div>
                <div className="font-medium">{campaign.startDate}</div>
              </div>
            </div>
            <div className="flex items-center">
              <BarChart3 className="h-4 w-4 text-gray-500 mr-2" />
              <div>
                <div className="text-sm text-gray-500">Conversões</div>
                <div className="font-medium">{formatNumber(campaign.stats.conversions)}</div>
              </div>
            </div>
            <div className="flex items-center">
              <ExternalLink className="h-4 w-4 text-gray-500 mr-2" />
              <div>
                <div className="text-sm text-gray-500">Receita</div>
                <div className="font-medium text-green-600">{formatCurrency(campaign.stats.revenue)}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(campaign.id)}
            >
              Editar
            </Button>
            <Button 
              variant="primary" 
              size="sm"
            >
              {campaign.status === 'active' ? 'Pausar' : 'Ativar'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CampaignCard;