import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import { formatNumber, formatCurrency, formatPercentage } from '../../lib/utils';

// Sample campaign data for demonstration
const campaignData = [
  {
    id: 1,
    name: 'Abandono de checkout - Moda',
    status: 'active',
    stats: {
      sent: 2354,
      delivered: 2245,
      interactions: 874,
      conversions: 215,
      revenue: 8620
    }
  },
  {
    id: 2,
    name: 'Carrinho abandonado - Eletrônicos',
    status: 'paused',
    stats: {
      sent: 1752,
      delivered: 1698,
      interactions: 623,
      conversions: 158,
      revenue: 12480
    }
  },
  {
    id: 3,
    name: 'Recuperação - Black Friday',
    status: 'scheduled',
    stats: {
      sent: 0,
      delivered: 0,
      interactions: 0,
      conversions: 0,
      revenue: 0
    }
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge variant="success">Ativa</Badge>;
    case 'paused':
      return <Badge variant="warning">Pausada</Badge>;
    case 'scheduled':
      return <Badge variant="info">Agendada</Badge>;
    default:
      return <Badge>Inativa</Badge>;
  }
};

const CampaignStatus = () => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Campanhas Recentes</CardTitle>
        <Badge variant="default" className="cursor-pointer">Ver Todas</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {campaignData.map((campaign) => (
            <div 
              key={campaign.id}
              className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-sm transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-800">{campaign.name}</h3>
                {getStatusBadge(campaign.status)}
              </div>
              
              <div className="grid grid-cols-4 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Enviadas</p>
                  <p className="font-medium text-gray-800">{formatNumber(campaign.stats.sent)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Interações</p>
                  <p className="font-medium text-gray-800">{formatNumber(campaign.stats.interactions)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Conversões</p>
                  <p className="font-medium text-gray-800">{formatNumber(campaign.stats.conversions)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Receita</p>
                  <p className="font-medium text-green-600">{formatCurrency(campaign.stats.revenue)}</p>
                </div>
              </div>
              
              {campaign.status !== 'scheduled' && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Taxa de conversão</span>
                    <span className="font-medium text-gray-800">
                      {formatPercentage(
                        (campaign.stats.conversions / campaign.stats.delivered) * 100
                      )}
                    </span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ 
                        width: `${(campaign.stats.conversions / campaign.stats.delivered) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignStatus;